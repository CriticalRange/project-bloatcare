import { NextResponse } from "next/server";
import { sqlConfig } from "../../layout";
const sql = require("mssql");

export async function GET(req, { params }) {
  const postId = params.postId;
  try {
    // make sure that any items are correctly URL encoded in the connection string
    console.log("- Connecting to Azure SQL Database...");
    await sql.connect(sqlConfig);
    console.log("- Successfully connected to Azure SQL Database!");

    const userSearchResult = await sql.query`SELECT *
          FROM posts
          WHERE post_id = ${postId}`;

    if (userSearchResult.recordset[0] === undefined) {
      return NextResponse.json(
        {
          error: {
            code: "post_not_found",
            message: `Post with the id ${postId} couldn't be found. Check if you correctly typed the postId. Example: /api/posts/IEYym5oKKimKrKUURsbg`,
          },
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json(
      {
        postId: userSearchResult.recordset[0].post_id,
        createdAt: userSearchResult.recordset[0].createdAt,
        creatorImage: userSearchResult.recordset[0].creatorImage,
        numberOfLikes: userSearchResult.recordset[0].numberOfLikes,
        creatorId: userSearchResult.recordset[0].creatorId,
        description: userSearchResult.recordset[0].description,
        numberOfDislikes: userSearchResult.recordset[0].numberOfDislikes,
        communityId: userSearchResult.recordset[0].communityId,
        title: userSearchResult.recordset[0].title,
        creatorDisplayName: userSearchResult.recordset[0].creatorDisplayName,
        numberOfComments: userSearchResult.recordset[0].numberOfComments,
        createdAt_seconds: userSearchResult.recordset[0].createdAt_seconds,
        createdAt_nanoseconds:
          userSearchResult.recordset[0].createdAt_nanoseconds,
        createdAt_nanoseconds:
          userSearchResult.recordset[0].createdAt_nanoseconds,
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
