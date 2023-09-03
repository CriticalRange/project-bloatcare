import { NextResponse } from "next/server";
const db = require("./db");

export async function GET(req, res) {
  try {
    const pool = await db.connect();
    return new NextResponse("API is operational", {
      status: 200,
    });
    pool.close();
  } catch (err) {
    console.warn(err);
    return new NextResponse(err, {
      status: 500,
    });
  }
}
