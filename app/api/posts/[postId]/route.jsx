import { NextResponse } from "next/server";
const db = require("../../db");

// GET Request for posts/[postId] api
export async function GET(req, { params }) {
  // Get the postId from parameters
  const postId = params.postId;

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Queries the post info with the postId
    const userSearchResult = await pool.request().query`SELECT *
          FROM posts
          WHERE post_id = ${postId}`;

    // if post is not found
    if (userSearchResult.recordset[0] === undefined) {
      return NextResponse.json(
        {
          error: {
            code: "post_not_found",
            message: `Post with the post id ${postId} couldn't be found. Check if you correctly typed the postId. Example: /api/posts/IEYym5oKKimKrKUURsbg`,
          },
        },
        {
          status: 400,
        }
      );
    }

    // return the post info
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
