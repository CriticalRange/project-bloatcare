import { NextResponse } from "next/server";
const db = require("../../db");

export async function GET(req, { params }) {
  const username = params.username;
  try {
    const pool = await db.connect();

    const userSearchResult = await pool.request().query`SELECT *
      FROM usernames
      WHERE username = ${username}`;

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
