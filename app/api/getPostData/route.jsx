import { NextResponse } from "next/server";
import { sqlConfig } from "../layout";
const sql = require("mssql");

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

    // make sure that any items are correctly URL encoded in the connection string
    console.log("- Connecting to Azure SQL Database...");
    await sql.connect(sqlConfig);
    console.log("- Successfully connected to Azure SQL Database!");
    const { name, hey } = data;
    return NextResponse.json(
      { Name: name, Hey: hey },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json({
      error: {
        message: `${err}`,
      },
    });
  }
}
