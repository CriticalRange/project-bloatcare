import { NextResponse } from "next/server";
const db = require("../db");

export async function GET(req) {
  const url = new URL(req.url);
  const communityId = url.searchParams.get("communityId");
  const isAuthenticated = url.searchParams.get("isAuthenticated");
  const count = Number(url.searchParams.get("count"));

  if (count === null || communityId === null || isAuthenticated === null) {
    return NextResponse.json(
      {
        error: {
          requires: "count and isAuthenticated and communityId",
        },
      },
      {
        status: 400,
      }
    );
  }
  try {
    const pool = await db.connect();

    console.log(isAuthenticated);

    const postSearchResult = await pool.request()
      .query`SELECT TOP (${count}) [post_id]
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
        ,[createdAt_seconds]
        ,[createdAt_nanoseconds]
        FROM [dbo].[posts]
        WHERE [communityId] = ${communityId}
        ORDER BY NEWID()`;

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
          createdAt_seconds: recordset.createdAt_seconds,
          createdAt_nanoseconds: recordset.createdAt_nanoseconds,
        };
      }
    );
    return NextResponse.json(mappedRecordset, {
      status: 200,
    });
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
