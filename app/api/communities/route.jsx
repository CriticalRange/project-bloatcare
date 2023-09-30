import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const db = require("../db");

// POST Request for communities API
export async function POST(req) {
  const res = await req.json();
  // get the communityId from the request body
  const { communityName, communityType, communityDesc } = res;

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Dates
    const now = new Date();
    const utcMilllisecondsSinceEpoch =
      now.getTime() + now.getTimezoneOffset() * 60 * 1000;

    // Community Uid
    const newCommunityUid = `comm-${uuidv4()}`;

    // Request to create the community
    const communityCreateRequest = [
      {
        CommunityId: newCommunityUid,
        CommunityName: communityName,
        CommunityType: communityType,
        CommunityDescription: communityDesc,
        CommunityCreatedAt: utcMilllisecondsSinceEpoch,
      },
    ];

    communityCreateRequest.forEach(async (item) => {
      const createCommunityQuery = `INSERT INTO [communities] (CommunityId, CommunityName, CommunityDescription, CommunityType, CommunityCreatedAt) VALUES ('${item.CommunityId}', '${item.CommunityName}', '${item.CommunityDescription}', '${item.CommunityType}', ${item.CommunityCreatedAt})`;
      // @ts-ignore Execute the query
      await pool.query(createCommunityQuery);
    });

    return NextResponse.json({
      id: newCommunityUid,
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
