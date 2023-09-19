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
  if (count === null || isAuthenticated === null) {
    return NextResponse.json(
      {
        error: {
          requires:
            "count and isAuthenticated (and communityIds if isAuthenticated is true)",
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
    const communityIdsArray =
      communityIds !== null ? communityIds.split(",") : null;

    // If not authenticated, get random posts. Else, get random posts with the included community IDs.
    const postSearchResult = !communityIdsArray
      ? await pool.request()
          .query`SELECT TOP (${count}) * FROM [dbo].[posts] ORDER BY NEWID()`
      : isAuthenticated === "false"
      ? await pool.request().query`SELECT TOP (${count}) *
        FROM [dbo].[posts]
        ORDER BY NEWID()`
      : isAuthenticated === "true"
      ? await pool.request().query`SELECT TOP (${count}) *
          FROM [dbo].[posts]
          WHERE [Community_Id] IN (${communityIdsArray})
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
          createdAt: recordset.Created_At,
          creatorImage: recordset.Creator_Image,
          numberOfLikes: recordset.Number_Of_Likes,
          creatorId: recordset.Creator_Id,
          description: recordset.Description,
          numberOfDislikes: recordset.Number_Of_Dislikes,
          communityId: recordset.Community_Id,
          title: recordset.Title,
          creatorDisplayName: recordset.Creator_Display_Name,
          numberOfComments: recordset.Number_Of_Comments,
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
