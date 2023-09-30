import { NextResponse } from "next/server";

const db = require("../db");
const sql = require("mssql");

// GET Request for getRandomPosts api
export async function GET(req) {
  // Get communityIds, isAuthenticated and count from parameters
  const url = new URL(req.url);
  const communityIds = url.searchParams.get("communityIds");
  const sort_type = url.searchParams.get("sortType");
  const count = Number(url.searchParams.get("count"));

  // If any of those 2 are null, return
  if (sort_type === null || count === null || communityIds === null) {
    return NextResponse.json(
      {
        error: {
          requires: "sortType, count and communityIds on the query string",
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

    // Get the communityIds as an array
    const communityIdsArray = communityIds.split(",");
    console.log(communityIdsArray);
    console.log(sort_type);

    // If not authenticated, get random posts. Else, get random posts with the included community IDs.
    const postSearchResult = await pool
      .request()
      .input("count", sql.Int, count)
      .input("communityIds", sql.NVarChar, communityIdsArray.join(","))
      .input("sortType", sql.NVarChar, sort_type).query`SELECT TOP (@count) *
    FROM [dbo].[posts]
    WHERE [communityId] IN (SELECT value FROM STRING_SPLIT(@communityIds, ','))
    ORDER BY [numberOfLikes] @sortType
`;

    // If no posts found witht the query, return.
    if (postSearchResult.recordset === undefined) {
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

    // Map the recordset and add it all to mappedRecordset
    const mappedRecordset = postSearchResult.recordset.map(
      (recordset, index) => {
        return {
          postId: recordset.postId,
          createdAt: recordset.createdAt,
          creatorImage: recordset.creatorImage,
          numberOfLikes: recordset.numberOfLikes,
          creatorId: recordset.creatorId,
          description: recordset.description,
          numberOfDislikes: recordset.numberOfDislikes,
          communityId: recordset.communityId,
          title: recordset.title,
          creatorDisplayName: recordset.creatorDisplayName,
          numberOfComments: recordset.numberOfComments,
        };
      }
    );

    return NextResponse.json(mappedRecordset, {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: { message: `${err}` } },
      {
        status: 400,
      }
    );
  }
}
