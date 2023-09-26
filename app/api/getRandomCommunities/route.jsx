import { NextResponse } from "next/server";

const db = require("../db");

export async function GET(req) {
  // Get communityIds, isAuthenticated and count from parameters
  const url = new URL(req.url);
  const isAuthenticated = url.searchParams.get("isAuthenticated");
  const count = Number(url.searchParams.get("count"));

  // If any of those are null, return
  if (count === null || isAuthenticated === null) {
    return NextResponse.json(
      {
        error: {
          requires: "count and isAuthenticated as query string",
        },
      },
      {
        status: 400,
      }
    );
  }

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // If not authenticated, get random posts. Else, get random posts with the included community IDs.
    const communitiesSearchResult = await pool.request()
      .query`SELECT TOP (${count}) * FROM [dbo].[communities] ORDER BY NEWID()`;

    // If no posts found witht the query, return.
    if (communitiesSearchResult.recordset === undefined) {
      return NextResponse.json(
        {
          error: {
            code: "community_query_not_found",
            message: `There was a problem with the query, please try again.`,
          },
        },
        {
          status: 400,
        }
      );
    }

    // Map the recordset and add it all to mappedRecordset
    const mappedRecordset = communitiesSearchResult.recordset.map(
      (recordset, index) => {
        return {
          CommunityId: recordset.CommunityId,
          CommunityName: recordset.CommunityName,
          CommunityType: recordset.CommunityType,
          CommunityDescription: recordset.CommunityDescription,
          CommunityCreatedAt: recordset.CommunityCreatedAt,
        };
      }
    );

    return NextResponse.json(mappedRecordset, {
      status: 200,
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
