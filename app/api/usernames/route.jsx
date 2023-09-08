import { NextResponse } from "next/server";

const db = require("../db");

export async function POST(req) {
  const res = await req.json();
  const { Username } = res;
  try {
    // @ts-ignore
    const pool = await db.connect();

    const userSearchResult = await pool.request().query`SELECT [Display_Name]
      FROM [dbo].[users]
      WHERE [Display_Name] = ${Username}`;

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
    pool.close();
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
