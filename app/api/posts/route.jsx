import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
const db = require("../db");
const sql = require("mssql");

export async function GET(req) {
  try {
    const pool = await db.connect();

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

    pool.close();

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

export async function POST(req) {
  const res = await req.json();

  try {
    const pool = await db.connect();
    const tableName = "posts";

    const newPostId = uuidv4();
    const now = new Date();
    const utcMilllisecondsSinceEpoch =
      now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);
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
        numberOfComments: res.numberOfComments,
      },
    ];

    // JSON dizisindeki her öğeyi tabloya ekleyin
    postCreateRequest.forEach(async (item) => {
      const postCreateQuery = `
        INSERT INTO ${tableName} (post_id, createdAt, creatorImage, numberOfLikes, creatorId, description, numberOfDislikes, communityId, title, creatorDisplayName, numberOfComments)
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

export async function DELETE(req) {
  const url = new URL(req.url);
  const postId = url.searchParams.get("postId");

  try {
    const pool = await db.connect();

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
