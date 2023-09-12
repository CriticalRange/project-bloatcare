import { NextResponse } from "next/server";
const db = require("../db");

// GET Request for getRandomPosts api
export async function GET(req) {
  // Get communityIds, isAuthenticated and count from parameters
  const url = new URL(req.url);
  const communityIds = url.searchParams.get("communityIds");
  const isAuthenticated = url.searchParams.get("isAuthenticated");
  const count = Number(url.searchParams.get("count"));

  // If any of those 3 is null, return
  if (count === null || communityIds === null || isAuthenticated === null) {
    return NextResponse.json(
      {
        error: {
          requires: "count and isAuthenticated and communityIds",
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

    // If not authenticated, get random posts. Else, get random posts with the included community IDs.
    const postSearchResult =
      isAuthenticated === "false"
        ? await pool.request().query`SELECT TOP (${count}) [post_id]
        ,[createdAt]
        ,[creatorImage]
        ,[numberOfLikes]
        ,[creatorId]
        ,[description]
        ,[numberOfDislikes]
        ,[communityId]
        ,[title]
        ,[creatorDisplayName]
        ,[numberOfComments]
        FROM [dbo].[posts]
        ORDER BY NEWID()`
        : isAuthenticated === "true"
        ? await pool.request().query`SELECT TOP (${count}) [post_id]
          ,[createdAt]
          ,[creatorImage]
          ,[numberOfLikes]
          ,[creatorId]
          ,[description]
          ,[numberOfDislikes]
          ,[communityId]
          ,[title]
          ,[creatorDisplayName]
          ,[numberOfComments]
          FROM [dbo].[posts]
          WHERE [communityId] IN (${communityIdsArray})
          ORDER BY NEWID()`
        : null;

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
          Post_Id: recordset.Post_Id,
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

    //Close the server connection for efficiency
    pool.close();
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
