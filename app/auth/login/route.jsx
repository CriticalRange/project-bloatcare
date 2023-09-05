import { NextResponse } from "next/server";
const db = require("../../api/db");
const bcrypt = require("bcrypt");
const jose = require("jose");

export async function POST(req) {
  const res = await req.json();
  const { Email, Password } = res;

  if (Email === null || Password === null) {
    return NextResponse.json({
      error: {
        requires: "Email and Password",
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
      console.log("Email not found working...");
      return NextResponse.json({
        error: {
          code: "email_not_found",
          message: "Email couldn't be found.",
        },
      });
    }

    let usersPasswordHash;
    let userInfo = {};

    emailQueryResult.recordset.forEach((item) => {
      usersPasswordHash = item.Password_Hash;
      userInfo = {
        ...item,
      };
    });
    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_AUTH_SECRET_KEY
    );
    const decodedPassword = await jose.jwtVerify(Password, secret);
    const match = await bcrypt.compare(decodedPassword, usersPasswordHash);

    const accessToken = await jose.jwtVerify(userInfo, secret);

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
