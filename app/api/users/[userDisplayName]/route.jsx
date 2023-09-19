import { NextResponse } from "next/server";
const db = require("../../db");

// GET Request for users/[userDisplayName] api
export async function GET(req, { params }) {
  // Get the user's display name from the paramaters
  const userDisplayName = params.userDisplayName;

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Query to get user info with the userDisplayName
    const userSearchResult = await pool.request().query`SELECT *
      FROM users
      WHERE [Display_Name] = ${userDisplayName}`;

    //Close the server connection for efficiency
    pool.close();

    // Some data needs to be parsed so parsing before serving it
    const parsedMetadata = JSON.parse(userSearchResult.recordset[0].Metadata);
    const parsedProviderData = JSON.parse(
      userSearchResult.recordset[0].Provider_Data
    );
    const parsedCommunities = JSON.parse(
      userSearchResult.recordset[0].Communities
    );

    // Return all the infos with the parsed Metadata and Provider Data
    return NextResponse.json(
      {
        Custom_Claims: userSearchResult.recordset[0].Custom_Claims,
        disabled:
          userSearchResult.recordset[0].disabled === 0 ? "false" : "true",
        Display_Name: userSearchResult.recordset[0].Display_Name,
        Email: userSearchResult.recordset[0].Email,
        Metadata: {
          ...parsedMetadata,
        },
        Provider_Data: {
          ...parsedProviderData,
        },
        Phone_Number: userSearchResult.recordset[0].Phone_Number,
        Photo_URL: userSearchResult.recordset[0].Photo_URL,
        Uid: userSearchResult.recordset[0].Uid,
        Communities: parsedCommunities,
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
