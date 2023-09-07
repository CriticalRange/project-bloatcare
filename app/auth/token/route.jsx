import { NextResponse } from "next/server";
const db = require("../../api/db");

const jose = require("jose");

export async function POST(req) {
  const res = await req.json();

  try {
    const accessAlg = process.env.NEXT_PUBLIC_ACCESS_JWT_ALGORITHM;

    const refreshTokenInfo = await jose.jwtVerify(
      res.refresh_token,
      db.refreshSecret
    );

    const newAccessToken = await new jose.SignJWT(refreshTokenInfo.payload)
      .setProtectedHeader({ alg: accessAlg })
      .sign(db.accessSecret);

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
