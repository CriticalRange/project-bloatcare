import { NextResponse } from "next/server";
const db = require("../db");

export async function GET(req) {
  const url = new URL(req.url);

  const count = Number(url.searchParams.get("count"));
  try {
    const pool = await db.connect();

    const userSearchResult = await pool.request()
      .query`SELECT TOP (${count}) [Custom_Claims]
    ,[Disabled]
    ,[Display_Name]
    ,[Email]
    ,[Email_Verified]
    ,[Metadata]
    ,[Password_Hash]
    ,[Password_Salt]
    ,[Phone_Number]
    ,[Photo_URL]
    ,[Provider_Data]
    ,[Tokens_Valid_After_Time]
    ,[Uid]
FROM [dbo].[users]
ORDER BY NEWID()`;

    if (userSearchResult.recordset[0] === undefined) {
      return NextResponse.json(
        {
          error: {
            code: "post_query_not_found",
            message: `There was a problem with the query, please try again.`,
          },
        },
        {
          status: 400,
        }
      );
    }
    const mappedRecordset = userSearchResult.recordset.map(
      (recordset, index) => {
        const parsedMetadata = JSON.parse(recordset.Metadata);
        const parsedProviderData = JSON.parse(recordset.Provider_Data);

        return {
          Custom_Claims: recordset.Custom_Claims,
          Disabled: recordset.Disabled,
          Display_Name: recordset.Display_Name,
          Email: recordset.Email,
          Email_Verified: recordset.Email_Verified,
          Metadata: {
            Creation_Time: parsedMetadata.creationTime,
            Last_Sign_In_Time: parsedMetadata.lastSignInTime,
          },
          Password_Hash: recordset.Password_Hash,
          Password_Salt: recordset.Password_Salt,
          Phone_Number: recordset.Phone_Number,
          Photo_URL: recordset.Photo_URL,
          Provider_Data: {
            Provider_Id: parsedProviderData.providerId,
            uid: parsedProviderData.uid,
            email: parsedProviderData.email,
          },
          Tokens_Valid_After_Time: recordset.Tokens_Valid_After_Time,
          Uid: recordset.Uid,
        };
      }
    );
    return NextResponse.json(mappedRecordset);
    pool.close();
  } catch (err) {
    return NextResponse.json(
      { error: { message: `${err}` } },
      {
        status: 400,
      }
    );
  }
}
