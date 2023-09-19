import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
const db = require("../db");
const sql = require("mssql");

// GET Request for posts api
export async function GET(req) {
  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Queries all the posts (should be changed later or maybe completely removed)
    const postSearchResult = await pool.request().query`SELECT [post_id]
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
    FROM [dbo].[posts]`;

    //Close the server connection for efficiency
    pool.close();

    // Map the recordsets and return it all to user
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
    const newPostId = uuidv4();

    // Date
    const now = new Date();
    const utcMilllisecondsSinceEpoch =
      now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);

    // Get all the requests into an array
    const postCreateRequest = [
      {
        post_id: newPostId,
        createdAt: utcSecondsSinceEpoch,
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
        INSERT INTO [posts] (Post_id, Created_At, Creator_Image, Number_Of_Likes, Creator_Id, description, Number_Of_Dislikes, Community_Id, title, Creator_Display_Name, Number_Of_Comments)
        VALUES ('${item.post_id}', '${item.createdAt}', '${item.creatorImage}', ${item.numberOfLikes}, '${item.creatorId}', '${item.description}', ${item.numberOfDislikes}, '${item.communityId}', '${item.title}', '${item.creatorDisplayName}', '${item.numberOfComments}')
      `;
      // Sorguyu çalıştırın
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
