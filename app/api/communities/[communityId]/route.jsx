import { NextResponse } from "next/server";

const db = require("../../db");

// GET Request for communities/[communityId] api
export async function GET(req, { params }) {
  // Get the communityId from parameters
  const communityId = params.communityId;

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Get the community info from SQL Server
    const communitySearchResult = await pool.request().query`SELECT *
      FROM communities
      WHERE [Display_Name] = ${communityId}`;

    //Close the server connection for efficiency
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
