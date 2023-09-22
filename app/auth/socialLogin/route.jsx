const db = require("../../api/db");
const bcrypt = require("bcrypt");
import * as jose from "jose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const res = await req.json();
  const { Display_Name, Email, Photo_URL } = res;

  try {
    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Queries availability of the current Email for the provider
    const userSearchResult = await pool.request().query`SELECT *
          FROM [dbo].[users]
          WHERE [Email] = ${Email}`;

    if (userSearchResult.recordset[0] === undefined) {
      return NextResponse.json(
        {
          error: {
            code: "no_user",
            message: "User does not exist",
          },
        },
        {
          status: 200,
        }
      );
    }

    const parsedProviderData = JSON.parse(
      userSearchResult.recordset[0].Provider_Data
    );

    if (parsedProviderData.providerId === "password") {
      return NextResponse.json({
        error: {
          code: "no_social_user",
          message: "User is not a social user",
        },
      });
    }

    console.log("User provider data is: ", parsedProviderData);

    // Predefine user info and password hash
    let userInfo = {};
    let Password_Hash;

    // Map the recordset to get userInfo and exclude password hash and salt
    userSearchResult.recordset.forEach((item) => {
      userInfo = {
        ...item,
      };
      Password_Hash = item.Password_Hash;
      delete userInfo.Password_Hash;
      delete userInfo.Password_Salt;
    });

    // Algorithms
    const accessAlg = process.env.NEXT_PUBLIC_ACCESS_JWT_ALGORITHM;
    const refreshAlg = process.env.NEXT_PUBLIC_REFRESH_JWT_ALGORITHM;

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

    // Return access and refresh tokens
    return NextResponse.json({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (err) {
    return NextResponse.json({ error: { message: `${err}` } });
  }
}
