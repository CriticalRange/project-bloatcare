import { NextResponse } from "next/server";
const db = require("../../api/db");
const bcrypt = require("bcrypt");
const jose = require("jose");

export async function POST(req) {
  const res = await req.json();
  const { Email, Password } = res;

  if (!Email || !Password) {
    return NextResponse.json({
      error: {
        code: "email_or_password_is_empty",
        message: "This GET Request requires Email and Password on the BODY.",
      },
    });
  }

  try {
    // @ts-ignore
    const pool = await db.connect();

    const emailQueryResult = await pool.request().query`SELECT [Custom_Claims]
    ,[Disabled]
    ,[Display_Name]
    ,[Email]
    ,[Email_Verified]
    ,[Metadata]
    ,[Photo_URL]
    ,[Provider_Data]
    ,[Uid]
    ,[Password_Hash]
    ,[Phone_Number]
    ,[Password_Salt]
    ,[Tokens_Valid_After_Time]
      FROM [dbo].[users]
      WHERE [Email] = ${Email}`;

    if (emailQueryResult.recordset.length === 0) {
      return NextResponse.json({
        error: {
          code: "user_not_found",
          message: `User with the email ${Email} was not found.`,
        },
      });
    }

    let userInfo = {};
    let Password_Hash;
    emailQueryResult.recordset.forEach((item) => {
      userInfo = {
        ...item,
      };
      Password_Hash = item.Password_Hash;
      delete userInfo.Password_Hash;
      delete userInfo.Password_Salt;
    });
    const accessAlg = process.env.NEXT_PUBLIC_ACCESS_JWT_ALGORITHM;
    const refreshAlg = process.env.NEXT_PUBLIC_REFRESH_JWT_ALGORITHM;

    const decodedPassword = await jose.jwtVerify(Password, db.accessSecret);
    const userInputPassword = decodedPassword.payload.Password;
    const match = bcrypt.compareSync(
      `${userInputPassword}`,
      `${Password_Hash}`
    );

    // @ts-ignore
    const accessToken = await new jose.SignJWT(userInfo)
      .setProtectedHeader({ alg: accessAlg })
      .setExpirationTime("30m")
      .sign(db.accessSecret);
    // @ts-ignore
    const refreshToken = await new jose.SignJWT(userInfo)
      .setProtectedHeader({ alg: refreshAlg })
      .setExpirationTime("100d")
      .sign(db.accessSecret);

    if (match) {
      return NextResponse.json({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } else {
      return NextResponse.json(
        {
          error: {
            code: "credentials_dont_match",
            message: "Credentials doesn't match. Please try again.",
          },
        },
        {
          status: 200,
        }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: { message: `${err}` } },
      {
        status: 400,
      }
    );
  }
}
