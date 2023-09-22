import { NextResponse } from "next/server";

const db = require("../../db");

// GET Request for communities/[communityId] api
export async function GET(req, { params }) {
  // Get the communityId from parameters
  const communityName = params.communityName;

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Get the community info from SQL Server
    const communitySearchResult = await pool.request().query`SELECT *
      FROM communities
      WHERE [CommunityName] = ${communityName}`;

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
