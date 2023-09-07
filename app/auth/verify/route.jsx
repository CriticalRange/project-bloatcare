import { NextResponse } from "next/server";
const db = require("../../api/db");

export async function POST(req) {
  const res = await req.json();
  const { verification_code, Email } = res;
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
    ,[Verification_Code]
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
    emailQueryResult.recordset.forEach((item) => {
      userInfo = {
        ...item,
      };
    });
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

    return NextResponse.json({
      matches: matches,
    });
  } catch (err) {
    return NextResponse.json({
      error: err,
    });
  }
}
