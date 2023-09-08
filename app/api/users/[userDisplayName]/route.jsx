import { NextResponse } from "next/server";
const db = require("../../db");

export async function GET(req, { params }) {
  const userDisplayName = params.userDisplayName;

  try {
    // @ts-ignore
    const pool = await db.connect();
    const userSearchResult = await pool.request().query`SELECT *
      FROM users
      WHERE [Display_Name] = ${userDisplayName}`;

    const parsedMetadata = JSON.parse(userSearchResult.recordset[0].Metadata);
    const parsedProviderData = JSON.parse(
      userSearchResult.recordset[0].Provider_Data
    );
    pool.close();

    return NextResponse.json(
      {
        Custom_Claims: userSearchResult.recordset[0].Custom_Claims,
        disabled:
          userSearchResult.recordset[0].disabled === 0 ? "false" : "true",
        display_Name: userSearchResult.recordset[0].Display_Name,
        Email: userSearchResult.recordset[0].Email,
        Metadata: {
          ...parsedMetadata,
        },
        Phone_Number: userSearchResult.recordset[0].Phone_Number,
        Photo_URL: userSearchResult.recordset[0].Photo_URL,
        Uid: userSearchResult.recordset[0].Uid,
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
