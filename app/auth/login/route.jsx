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
        message:
          "This GET Request requires Email and Password on the URL. Example: /api/auth/login?Email=test@gmail.com&password=$2b$10$7KfzslK1/zYXnuYa8H6KR.8t0aw.619eEzatLTjMln1YzrpFh9q1m",
      },
    });
  }

  try {
    const pool = await db.connect();
    const tableName = "users";

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
WHERE [Email] = ${Email}
`;

    if (emailQueryResult.recordset.length === 0) {
      return NextResponse.json({
        error: {
          code: "user_not_found",
          message: `User with the email ${Email} was not found.`,
        },
      });
    }

    let userInfo = {};

    emailQueryResult.recordset.forEach((item) => {
      userInfo = {
        ...item,
      };
    });
    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_AUTH_SECRET_KEY
    );

    const decodedPassword = await jose.jwtVerify(Password, secret);
    const userInputPassword = decodedPassword.payload.Password;
    console.log(
      "Password: ",
      userInputPassword,
      "DB Hash: ",
      userInfo.Password_Hash
    );
    const match = await bcrypt.compare(
      userInputPassword,
      userInfo.Password_Hash
    );
    console.log("Matches?", match);

    const alg = process.env.NEXT_PUBLIC_JWT_ALGORITHM;
    const accessToken = await new jose.SignJWT(userInfo)
      .setProtectedHeader({ alg })
      .sign(secret);

    if (match) {
      return NextResponse.json({
        access_token: accessToken,
      });
    } else {
      return NextResponse.json({
        error: {
          code: "credentials_dont_match",
          message: "Credentials doesn't match. Please try again.",
        },
      });
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
