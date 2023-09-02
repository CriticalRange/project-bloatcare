import { NextResponse } from "next/server";
import { sqlConfig } from "../../layout";
const sql = require("mssql");

export async function GET(req, { params }) {
  const userUid = params.userUid;
  if (userUid === "null") {
    return NextResponse.json(
      { error: { error: "UserUid can't be empty" } },
      {
        status: 400,
      }
    );
  }
  // make sure that any items are correctly URL encoded in the connection string
  console.log("- Connecting to Azure SQL Database...");
  await sql.connect(sqlConfig);
  console.log("- Successfully connected to Azure SQL Database!");
  const userSearchResult = await sql.query`SELECT *
    FROM users
    WHERE Uid = ${userUid}`;
  return NextResponse.json(
    {
      Custom_Claims: userSearchResult.recordset[0].Custom_Claims,
      disabled: userSearchResult.recordset[0].disabled === 0 ? "false" : "true",
      display_Name: userSearchResult.recordset[0].Display_Name,
      Email: userSearchResult.recordset[0].Email,
      Email_Verified:
        userSearchResult.recordset[0].Email_Verified === 0 ? "false" : "true",
      Metadata: {
        creationTime: userSearchResult.recordset[0].creationTime,
        lastSignInTime: userSearchResult.recordset[0].lastSignInTime,
      },
      Password_Hash: userSearchResult.recordset[0].Password_Hash,
      Password_Salt: userSearchResult.recordset[0].Password_Salt,
      Phone_Number: userSearchResult.recordset[0].Phone_Number,
      Photo_Number: userSearchResult.recordset[0].Photo_Number,
      Tokens_Valid_After_Time:
        userSearchResult.recordset[0].Tokens_Valid_After_Time,
      Uid: userSearchResult.recordset[0].Uid,
      hopefully: userSearchResult.recordset[0].Metadata.creationTime,
    },
    {
      status: 200,
    }
  );
}
