import { NextResponse } from "next/server";
const db = require("../db");

export async function POST(request) {
  try {
    if (request.bodyUsed === false) {
      return NextResponse.json({
        error: {
          requires: "Body",
          message:
            "Please provide communityId or postId or creatorDisplayName in the Request Body",
        },
      });
    }
    const data = await request.json();
    console.log(request.bodyUsed);

    if (request.bodyUsed === false) {
      return NextResponse.json({
        error: {
          requires: "communityId OR postId OR creatorDisplayName",
          message: "Please provide communityId or postId or creatorDisplayName",
        },
      });
    }
    console.log("Data is: ", data);
    const { name, hey } = data;
    /* const pool = await db.connect(); */

    /* await pool.request().query */
    return NextResponse.json(
      { Name: name, Hey: hey },
      {
        status: 200,
      }
    );
    /* pool.close(); */
  } catch (err) {
    return NextResponse.json({
      error: {
        message: `${err}`,
      },
    });
  }
}
