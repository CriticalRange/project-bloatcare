import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
const db = require("../../api/db");
const bcrypt = require("bcrypt");
const jose = require("jose");

// POST Request for /auth/login api
export async function POST(req) {
  const res = await req.json();
  // Get the Email and Password from request body
  const { Email, Password, Auth_Type } = res;
  console.log(res);

  if (!Auth_Type) {
    return NextResponse.json({
      error: {
        code: "auth_type_is_empty",
        message: "This GET Request requires Auth_Type on the BODY.",
      },
    });
  }

  // If Email or Password is empty
  if (Auth_Type === "password") {
    if (!Email || !Password) {
      return NextResponse.json({
        error: {
          code: "email_or_password_is_empty",
          message: "This GET Request requires Email and Password on the BODY.",
        },
      });
    }
  }

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Get the user info with the Email
    const emailQueryResult = await pool.request().query`SELECT *
      FROM [dbo].[users]
      WHERE [Email] = ${Email}`;

    // If user with the email doesn't exist
    if (Auth_Type === "password" && emailQueryResult.recordset.length === 0) {
      return NextResponse.json({
        error: {
          code: "user_not_found",
          message: `User with the email ${Email} was not found.`,
        },
      });
    }

    // Algorithms
    const accessAlg = process.env.NEXT_PUBLIC_ACCESS_JWT_ALGORITHM;
    const refreshAlg = process.env.NEXT_PUBLIC_REFRESH_JWT_ALGORITHM;

    if (Auth_Type === "password") {
      // Predefine user info and password hash
      let userInfo = {};
      let Password_Hash;

      // Map the recordset to get userInfo and exclude password hash and salt
      emailQueryResult.recordset.forEach((item) => {
        userInfo = {
          ...item,
        };
        Password_Hash = item.Password_Hash;
        delete userInfo.Password_Hash;
        delete userInfo.Password_Salt;
      });

      // Try to verify the password
      const decodedPassword = await jose.jwtVerify(Password, db.accessSecret);
      const userInputPassword = decodedPassword.payload.Password;
      const match = bcrypt.compareSync(
        `${userInputPassword}`,
        `${Password_Hash}`
      );

      // Create a new accessToken and refreshToken
      // @ts-ignore
      const accessToken = await new jose.SignJWT(userInfo)
        .setProtectedHeader({ alg: accessAlg })
        .setExpirationTime("30m")
        .sign(db.accessSecret);
      // @ts-ignore
      const refreshToken = await new jose.SignJWT(userInfo)
        .setProtectedHeader({ alg: refreshAlg })
        .setExpirationTime("100d")
        .sign(db.accessSecret);

      // If the password match with the one in database, return access and refresh tokens
      if (match) {
        return NextResponse.json({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      } else {
        return NextResponse.json(
          {
            error: {
              code: "credentials_dont_match",
              message: "Credentials doesn't match. Please try again.",
            },
          },
          {
            status: 200,
          }
        );
      }
    } else if (Auth_Type === "google") {
      if (emailQueryResult.recordset.length === 0) {
        // User Uid
        const newUserUid = `user_${uuidv4()}`;

        // Date
        const now = new Date();

        const userCreateRequest = [
          {
            Auth_Type: res.Auth_Type,
            Custom_Claims: JSON.stringify({}),
            Disabled: 0,
            Display_Name: res.Display_Name,
            Email: Email,
            Email_Verified: res.Email_Verified === true ? 1 : 0,
            Metadata: JSON.stringify({
              creationTime: now,
              lastSignInTime: now,
            }),
            Password_Hash: null,
            Password_Salt: null,
            Phone_Number: null,
            Photo_URL: res.Photo_URL,
            Provider_Data: JSON.stringify({
              providerId: "google",
              email: res.Email,
              uid: res.GoogleId,
              locale: res.locale,
              Photo_URL: res.Photo_URL,
              Verified_Email: res.Verified_Email,
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
        console.log("User create request is: ", userCreateRequest);
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

        return NextResponse.json(
          {
            access_token: accessToken,
            refresh_token: refreshToken,
            userUid: newUserUid,
          },
          {
            status: 200,
          }
        );
      }
      // Predefine user info and password hash
      let userInfo = {};

      // Map the recordset to get userInfo and exclude password hash and salt
      emailQueryResult.recordset.forEach((item) => {
        userInfo = {
          ...item,
        };
        delete userInfo.Password_Hash;
        delete userInfo.Password_Salt;
      });
      console.log(userInfo);

      // Create a new accessToken and refreshToken
      // @ts-ignore
      const accessToken = await new jose.SignJWT(userInfo)
        .setProtectedHeader({ alg: accessAlg })
        .setExpirationTime("30m")
        .sign(db.accessSecret);
      // @ts-ignore
      const refreshToken = await new jose.SignJWT(userInfo)
        .setProtectedHeader({ alg: refreshAlg })
        .setExpirationTime("100d")
        .sign(db.accessSecret);

      return NextResponse.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
  } catch (err) {
    console.error("There was an error logging in: ", err);
    return NextResponse.json(
      { error: { message: `${err}` } },
      {
        status: 400,
      }
    );
  }
}
