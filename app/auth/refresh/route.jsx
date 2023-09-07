import { NextResponse } from "next/server";
const db = require("../../api/db");

const jose = require("jose");

export async function POST(req) {
  const res = await req.json();

  try {
    const alg = process.env.NEXT_PUBLIC_JWT_ALGORITHM;

    const accessTokenInfo = await jose.jwtVerify(
      res.refresh_token,
      db.accessSecret
    );
    const newAccessToken = await new jose.SignJWT(accessTokenInfo.payload)
      .setProtectedHeader({ alg })
      .sign(db.accessSecret);
  } catch (err) {
    return NextResponse.json(
      { error: { message: `${err}` } },
      {
        status: 400,
      }
    );
  }
}
