import { NextResponse } from "next/server";
const db = require("../../api/db");

// POST Request for /auth/verify api, verifies the verification token entered by user
export async function POST(req) {
  const res = await req.json();
  // Get the Verification Code and Email from request Body
  const { verification_code, Email } = res;

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Get the user info with the Email
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
    ,[Verification_Code]
      FROM [dbo].[users]
      WHERE [Email] = ${Email}`;

    // If User with the Email doesn't exist
    if (emailQueryResult.recordset.length === 0) {
      return NextResponse.json({
        error: {
          code: "user_not_found",
          message: `User with the email ${Email} was not found.`,
        },
      });
    }

    // Map the recordset to userInfo
    let userInfo = {};
    emailQueryResult.recordset.forEach((item) => {
      userInfo = {
        ...item,
      };
    });

    // Predefine matches to get the equality of both verification codes on it
    let matches;
    if (verification_code === userInfo.Verification_Code) {
      matches = true;
      const verifyUserQuery = `UPDATE [users]
      SET Email_Verified = 1
      WHERE [Email] = '${Email}'`;
      await pool.query(verifyUserQuery);
    } else {
      matches = false;
    }

    // return matches
    return NextResponse.json({
      matches: matches,
    });
  } catch (err) {
    return NextResponse.json({
      error: err,
    });
  }
}
