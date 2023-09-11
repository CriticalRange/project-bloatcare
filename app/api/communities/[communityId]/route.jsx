import { NextResponse } from "next/server";

const db = require("../../db");

export async function GET(req, { params }) {
  const communityId = params.communityId;

  try {
    // @ts-ignore
    const pool = await db.connect();

    const communitySearchResult = await pool.request().query`SELECT *
      FROM communities
      WHERE [Display_Name] = ${communityId}`;

    pool.close();

    return NextResponse.json({
      response: communitySearchResult.recordset[0],
    });
  } catch (err) {
    return NextResponse.json(
      { error: { message: `${err}` } },
      {
        status: 400,
      }
    );
  }
}
