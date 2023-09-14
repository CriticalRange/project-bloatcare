import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
const db = require("../db");
const bcrypt = require("bcrypt");
const jose = require("jose");

// GET Request for users api
export async function GET(req) {
  return NextResponse.json(
    {
      warning: {
        code: "requires_user_uid",
        message:
          "Please provide the User's Uid to get the information from. Example: /api/users/53295346-a84e-489a-b720-d360267f1b2c",
      },
    },
    {
      status: 303,
    }
  );
}

// POST Request for users api
export async function POST(req) {
  const res = await req.json();

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Algorithms
    const accessAlg = process.env.NEXT_PUBLIC_ACCESS_JWT_ALGORITHM;
    const refreshAlg = process.env.NEXT_PUBLIC_REFRESH_JWT_ALGORITHM;

    // Dates
    const now = new Date();
    const utcMilllisecondsSinceEpoch =
      now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);

    // Password
    const decodedPassword = await jose.jwtVerify(res.Password, db.accessSecret);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(`${decodedPassword.payload.Password}`, salt);

    // User Uid
    const newUserUid = uuidv4();

    // Make a request array that contains new user information
    const userCreateRequest = [
      {
        Custom_Claims: JSON.stringify({}),
        Disabled: 0,
        Display_Name: res.Display_Name,
        Email: res.Email,
        Email_Verified: 0,
        Metadata: JSON.stringify({
          creationTime: now,
          lastSignInTime: now,
        }),
        Password_Hash: hash,
        Password_Salt: salt,
        Phone_Number: res.Phone_Number,
        Photo_URL: null,
        Provider_Data: JSON.stringify({
          providerId: "password",
          email: res.Email,
          uid: res.Email,
        }),
        Tokens_Valid_After_Time: null,
        Uid: newUserUid,
        Communities: JSON.stringify([
          {
            name: "template",
            id: "Unknown",
            isJoined: true,
          },
        ]),
      },
    ];
    let userInfo;

    // Make a query with the request to add user to database
    userCreateRequest.forEach(async (item) => {
      userInfo = {
        ...item,
      };
      delete userInfo.Password_Hash;
      delete userInfo.Password_Salt;
      const userCreateQuery = `
      INSERT INTO [users] (Custom_Claims, Disabled, Display_Name, Email, Email_Verified, Metadata, Password_Hash, Password_Salt, Phone_Number, Photo_URL, Provider_Data, Tokens_Valid_After_Time, Uid, Communities) VALUES ('${item.Custom_Claims}', '${item.Disabled}', '${item.Display_Name}', '${item.Email}', '${item.Email_Verified}', '${item.Metadata}', '${item.Password_Hash}', '${item.Password_Salt}', '${item.Phone_Number}', '${item.Photo_URL}', '${item.Provider_Data}', '${item.Tokens_Valid_After_Time}', '${item.Uid}', '${item.Communities}')
      `;
      // @ts-ignore
      await pool.query(userCreateQuery);
    });

    //Close the server connection for efficiency
    pool.close();

    // Sign new accessToken and refreshToken and send it to user
    const accessToken = await new jose.SignJWT(userInfo)
      .setProtectedHeader({ alg: accessAlg })
      .setExpirationTime("30m")
      .sign(db.accessSecret);
    const refreshToken = await new jose.SignJWT(userInfo)
      .setProtectedHeader({ alg: refreshAlg })
      .setExpirationTime("100d")
      .sign(db.refreshSecret);

    return NextResponse.json(
      {
        access_token: accessToken,
        refresh_token: refreshToken,
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

// PATCH Request for users API
export async function PATCH(req) {
  const res = await req.json();
  const {
    Communities,
    Uid,
    Disabled,
    Display_Name,
    Metadata,
    Photo_URL,
    Provider_Data,
    Phone_Number,
    Tokens_Valid_After_Time,
  } = res;

  if (!Uid) {
    return NextResponse.json({
      error: {
        code: "REQUIRES_UID",
        message:
          "This PATCH Request at least requires 'Uid' in the request body",
      },
    });
  }

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Define new Parameters
    let newCommunities,
      NewDisabled,
      NewDisplay_Name,
      NewMetadata,
      NewPhoto_URL,
      NewProvider_Data,
      NewPhone_Number,
      NewTokens_Valid_After_Time;

    // If there are new communities, merge the communities else Get the old communities and save
    const getUserCommunitiesQuery = await pool.request()
      .query`SELECT * FROM [users] WHERE Uid = ${Uid}`;

    // Parsed Data
    const OldCommunities = JSON.parse(
      getUserCommunitiesQuery.recordset[0].Communities
    );
    const OldMetadata = [
      JSON.parse(getUserCommunitiesQuery.recordset[0].Metadata),
    ];
    console.log("OldMetadata is: ", OldMetadata);
    const OldProviderData = JSON.parse(
      getUserCommunitiesQuery.recordset[0].Provider_Data
    );
    // New Values

    if (!Communities) {
      newCommunities = JSON.stringify([
        ...OldCommunities.map((OldCommunities) => OldCommunities),
      ]);
    } else {
      // Merge the old and new communities
      newCommunities = JSON.stringify([
        ...OldCommunities.map((OldCommunities) => OldCommunities),
        Communities,
      ]);
    }

    if (Disabled) {
      NewDisabled = Disabled;
    } else {
      NewDisabled = getUserCommunitiesQuery.recordset[0].Disabled;
    }

    if (Display_Name) {
      NewDisplay_Name = Display_Name;
    } else {
      NewDisplay_Name = getUserCommunitiesQuery.recordset[0].Display_Name;
    }

    if (Metadata) {
      NewMetadata = JSON.stringify([
        ...OldMetadata.map((OldMetadata) => OldMetadata),
        Metadata,
      ]);
    } else {
      NewMetadata = JSON.stringify([
        OldMetadata.map((OldMetadata) => OldMetadata),
      ]);
    }
    console.log(NewMetadata);

    if (Photo_URL) {
      NewPhoto_URL = Photo_URL;
    } else {
      NewPhoto_URL = getUserCommunitiesQuery.recordset[0].Photo_URL;
    }

    if (Provider_Data) {
      NewProvider_Data = JSON.stringify([
        ...OldProviderData.map((OldProviderData) => OldProviderData),
        Provider_Data,
      ]);
    } else {
      NewProvider_Data = JSON.stringify([
        ...OldProviderData.map((OldProviderData) => OldProviderData),
      ]);
    }

    if (Phone_Number) {
      NewPhone_Number = Phone_Number;
    } else {
      NewPhone_Number = getUserCommunitiesQuery.recordset[0].Phone_Number;
    }

    if (Tokens_Valid_After_Time) {
      NewTokens_Valid_After_Time = Tokens_Valid_After_Time;
    } else {
      NewTokens_Valid_After_Time =
        getUserCommunitiesQuery.recordset[0].Tokens_Valid_After_Time;
    }

    // Add the new communities to user
    const updateUserInfoQuery = `UPDATE [users] SET Communities = '${newCommunities}', Disabled = '${NewDisabled}', Display_Name = '${NewDisplay_Name}', Metadata = '${NewMetadata}', Photo_Url = '${NewPhoto_URL}', Provider_Data = '${NewProvider_Data}', Phone_Number = '${NewPhone_Number}', Tokens_Valid_After_Time = '${NewTokens_Valid_After_Time}' WHERE Uid = '${Uid}'`;

    await pool.query(updateUserInfoQuery);

    return NextResponse.json({ update: "maybe" });
  } catch (err) {
    return NextResponse.json(
      { error: { message: `${err}` } },
      {
        status: 400,
      }
    );
  }
}

/* // PUT Request for users API
export async function PUT(req) {
  const res = await req.json();
  const {
    Communities,
    Custom_Claims,
    Display_Name,
    Email,
    Metadata,
    Phone_Number,
    Photo_URL,
    Uid,
    disabled,
  } = res;

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    const newUserData = [
      {
        Communities: JSON.parse(Communities),
        Custom_Claims: JSON.parse(Custom_Claims),
        Display_Name: Display_Name,
        Email: Email,
        Metadata: JSON.parse(Metadata),
        Phone_Number: Phone_Number,
        Photo_URL: Photo_URL,
        Uid: Uid,
        disabled: disabled,
      },
    ];

    newUserData.forEach((item) => {
      console.log(item);
    });
    return NextResponse.json(
      newUserData.forEach((item) => {
        console.log(item);
      })
    );
  } catch (err) {
    return NextResponse.json(
      { error: { message: `${err}` } },
      {
        status: 400,
      }
    );
  }
} */

// DELETE Request for users api
export async function DELETE(req) {
  const url = new URL(req.url);
  // Get userUid from search parameters
  const userUid = url.searchParams.get("userUid");

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Make a request the delete the user with the userUid
    const userDeleteQuery = `DELETE FROM users WHERE [Uid] = '${userUid}'`;
    await pool.query(userDeleteQuery);

    //Close the server connection for efficiency
    pool.close();

    // Return success: true
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
