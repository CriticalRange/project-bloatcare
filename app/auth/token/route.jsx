import { NextResponse } from "next/server";
const db = require("../../api/db");

const jose = require("jose");

// POST Request for /auth/token api, allows to get an access token with a refresh token
export async function POST(req) {
  const res = await req.json();

  try {
    // Access token algorithm
    const accessAlg = process.env.NEXT_PUBLIC_ACCESS_JWT_ALGORITHM;

    // Verify the refresh token
    const refreshTokenInfo = await jose.jwtVerify(
      res.refresh_token,
      db.refreshSecret
    );

    // Create a new access token
    const newAccessToken = await new jose.SignJWT(refreshTokenInfo.payload)
      .setProtectedHeader({ alg: accessAlg })
      .sign(db.accessSecret);

    // return the new access token
    return NextResponse.json({
      access_token: newAccessToken,
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
