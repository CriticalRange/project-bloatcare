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
      console.log("Making new account...");
      // @ts-ignore
      await pool.query(userCreateQuery);
      console.log("New account created");
    });

    // Sign new accessToken and refreshToken and send it to user
    const accessToken = await new jose.SignJWT(userInfo)
      .setProtectedHeader({ alg: accessAlg })
      .setExpirationTime("30m")
      .sign(db.accessSecret);
    const refreshToken = await new jose.SignJWT(userInfo)
      .setProtectedHeader({ alg: refreshAlg })
      .setExpirationTime("100d")
      .sign(db.refreshSecret);

    /* //Close the server connection for efficiency
    pool.close(); */

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
// Updates user information based on the provided request body

export async function PATCH(req) {
  try {
    // Parse the request body
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

    // Check if the 'Uid' field is present in the request body
    if (!Uid) {
      return NextResponse.json({
        error: {
          code: "REQUIRES_UID",
          message: "This PATCH Request requires 'Uid' in the request body",
        },
      });
    }

    // @ts-ignore Connect to the database
    const pool = await db.connect();

    // Retrieve user information from the database
    const getUserCommunitiesQuery = await pool.request().query`
      SELECT Communities, Metadata, Provider_Data, Disabled, Display_Name, Photo_URL, Phone_Number, Tokens_Valid_After_Time
      FROM [users]
      WHERE Uid = ${Uid}
    `;

    // Extract the user data
    const userData = getUserCommunitiesQuery.recordset[0];
    const {
      Communities: oldCommunities,
      Metadata: oldMetadata,
      Provider_Data: oldProviderData,
      Disabled: oldDisabled,
      Display_Name: oldDisplayName,
      Photo_URL: oldPhotoUrl,
      Phone_Number: oldPhoneNumber,
      Tokens_Valid_After_Time: oldTokensValidAfterTime,
    } = userData;

    console.log("Old communities is: ", oldCommunities);
    // Update user information based on the provided fields in the request body
    const newCommunities = Communities
      ? JSON.stringify([...JSON.parse(oldCommunities), Communities])
      : oldCommunities;
    console.log("New Communities is: ", newCommunities);
    const newDisabled = Disabled || oldDisabled;
    const newDisplayName = Display_Name || oldDisplayName;
    const newMetadata = Metadata
      ? JSON.stringify([...JSON.parse(oldMetadata), Metadata])
      : oldMetadata;
    const newPhotoUrl = Photo_URL || oldPhotoUrl;
    const newProviderData = Provider_Data
      ? JSON.stringify([...JSON.parse(oldProviderData), Provider_Data])
      : oldProviderData;
    const newPhoneNumber = Phone_Number || oldPhoneNumber;
    const newTokensValidAfterTime =
      Tokens_Valid_After_Time || oldTokensValidAfterTime;

    // Update the user information in the database
    const updateUserInfoQuery = `
      UPDATE [users]
      SET Communities = '${newCommunities}',
        Disabled = '${newDisabled}',
        Display_Name = '${newDisplayName}',
        Metadata = '${newMetadata}',
        Photo_Url = '${newPhotoUrl}',
        Provider_Data = '${newProviderData}',
        Phone_Number = '${newPhoneNumber}',
        Tokens_Valid_After_Time = '${newTokensValidAfterTime}'
      WHERE Uid = '${Uid}'
    `;

    await pool.query(updateUserInfoQuery);

    // Return a success response
    return NextResponse.json({ success: "true" });
  } catch (err) {
    console.log(err);
    // Return an error response with the error message
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
