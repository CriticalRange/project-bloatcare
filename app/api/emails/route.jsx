import { NextResponse } from "next/server";
const db = require("../db");

// GET Request for emails api
export async function POST(req) {
  const res = await req.json();
  // Get Email from the request body
  const { Email } = res;

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Get the email availability from SQL Server
    const userSearchResult = await pool.request().query`SELECT [Email]
      FROM [dbo].[users]
      WHERE [Email] = ${Email}`;

    // If email can't be found, it will count as available
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

    // If found, set available to false
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
