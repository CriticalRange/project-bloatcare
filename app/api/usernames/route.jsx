import { NextResponse } from "next/server";

const db = require("../db");

// POST Request for usernames api
export async function POST(req) {
  const res = await req.json();
  // Get the Username from request body
  const { Username } = res;
  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Queries availability of the current Username
    const userSearchResult = await pool.request().query`SELECT [Display_Name]
      FROM [dbo].[users]
      WHERE [Display_Name] = ${Username}`;

    //Close the server connection for efficiency
    pool.close();

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
