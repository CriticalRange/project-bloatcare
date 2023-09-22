import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const db = require("../db");

// GET Request for posts api
export async function GET(req) {
  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Queries all the posts (should be changed later or maybe completely removed)
    const postSearchResult = await pool.request().query`SELECT *
    FROM [dbo].[posts]`;

    // Map the recordsets and return it all to user
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
    return NextResponse.json(
      { error: { message: `${err}` } },
      {
        status: 400,
      }
    );
  }
}

// POST Request for posts api
export async function POST(req) {
  const res = await req.json();

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Uid
    const newPostId = `post_${uuidv4()}`;

    // Date
    const now = new Date();
    const dateGetter = new Date(now.getTime());

    // Get all the requests into an array
    const postCreateRequest = [
      {
        postId: newPostId,
        createdAt: dateGetter,
        creatorImage: res.creatorImage,
        numberOfLikes: 0,
        creatorId: res.creatorId,
        description: res.description,
        numberOfDislikes: 0,
        communityId: res.communityId,
        title: res.title,
        creatorDisplayName: res.creatorDisplayName,
        numberOfComments: 0,
      },
    ];

    // Add everything inside the array above to query and run the query
    postCreateRequest.forEach(async (item) => {
      const postCreateQuery = `
        INSERT INTO [posts] (postId, createdAt, creatorImage, numberOfLikes, creatorId, description, numberOfDislikes, communityId, title, creatorDisplayName, numberOfComments)
        VALUES ('${item.postId}', '${item.createdAt}', '${item.creatorImage}', ${item.numberOfLikes}, '${item.creatorId}', '${item.description}', ${item.numberOfDislikes}, '${item.communityId}', '${item.title}', '${item.creatorDisplayName}', '${item.numberOfComments}')
      `;
      // Run the query
      await pool.query(postCreateQuery);
    });

    return NextResponse.json(
      {
        post_id: newPostId,
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

// DELETE Request for posts api
export async function DELETE(req) {
  const url = new URL(req.url);
  // Get the post id from search parameters
  const postId = url.searchParams.get("postId");

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Run the query that deletes the post with the postId
    const deleteQuery = `DELETE FROM posts WHERE [post_id] = '${postId}'`;
    await pool.query(deleteQuery);

    return NextResponse.json(
      {
        success: "true",
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
