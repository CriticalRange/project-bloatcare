import { NextResponse } from "next/server";

const db = require("../db");

export async function POST(req) {
  const res = await req.json();
  // Get the Uid, communityId from request body
  const { Uid, communityId } = res;

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Queries user with the Uid
    const userSearchResult = await pool.request().query`SELECT *
          FROM [dbo].[users]
          WHERE [Uid] = ${Uid}`;

    // If user with Uid doesn't exist
    if (userSearchResult.recordset.length === 0) {
      return NextResponse.json(
        {
          error: {
            code: "uid_not_found",
            message: "Uid doesn't exist on the request body",
          },
        },
        {
          status: 400,
        }
      );
    }

    // Parse the communities sent from query
    const parsedCommunities = JSON.parse(
      userSearchResult.recordset[0].Communities
    );
    console.log(parsedCommunities);

    // Check if a community with matching ID exists
    const matchingIndex = parsedCommunities.findIndex(
      (item) => item.name === "HiBrosd"
    );
    if (matchingIndex !== -1) {
      parsedCommunities[matchingIndex].isJoined =
        !parsedCommunities[matchingIndex].isJoined;
    } else {
      // if it doesnt't exist
      return NextResponse.json(
        {
          error: {
            code: "community_not_found",
            message: "Community doesn't exist on the request body",
          },
        },
        {
          status: 400,
        }
      );
    }

    console.log("New parsed communities: ", parsedCommunities);

    // Update the user's communities
    await pool.request().query`UPDATE [dbo].[users]
      SET [Communities] = ${JSON.stringify(parsedCommunities)}
      WHERE [Uid] = ${Uid}`;

    //Close the server connection for efficiency
    pool.close();

    return NextResponse.json({
      success: true,
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
