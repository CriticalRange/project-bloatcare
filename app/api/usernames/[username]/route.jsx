import { NextResponse } from "next/server";
import { sqlConfig } from "../../layout";
const sql = require("mssql");

export async function GET(req, { params }) {
  const username = params.username;
  try {
    // make sure that any items are correctly URL encoded in the connection string
    console.log("- Connecting to Azure SQL Database...");
    await sql.connect(sqlConfig);
    console.log("- Successfully connected to Azure SQL Database!");

    const userSearchResult = await sql.query`SELECT *
      FROM usernames
      WHERE username = ${username}`;
    console.log(userSearchResult.recordset[0]);

    if (userSearchResult.recordset[0] === undefined) {
      return NextResponse.json(
        {
          available: true,
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json(
      {
        available: false,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: { message: `${err}` } },
      {
        status: 400,
      }
    );
  }
}
