import { NextResponse } from "next/server";
const db = require("../../db");

export async function GET(req) {
  const url = new URL(req.url);

  const count = Number(url.searchParams.get("count"));
  try {
    const pool = await db.connect();

    const userSearchResult = await pool.request().query`SELECT TOP 10 *
    FROM posts ORDER BY NEWID()`;

    if (userSearchResult.recordset[0] === undefined) {
      return NextResponse.json(
        {
          error: {
            code: "post_query_not_found",
            message: `There was a problem with the query, please try again.`,
          },
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(userSearchResult.recordset[0]);
    pool.close();
  } catch (err) {
    return NextResponse.json(
      { error: { message: `${err}` } },
      {
        status: 400,
      }
    );
  }
}
