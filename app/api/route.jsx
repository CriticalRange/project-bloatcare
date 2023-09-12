import { NextResponse } from "next/server";
const db = require("./db");

// GET Function for /api
export async function GET(req, res) {
  try {
    // @ts-ignore Start the server
    const pool = await db.connect();

    // Close the server immediately and check for errors
    pool.close();
    return new NextResponse("API is operational", {
      status: 200,
    });
  } catch (err) {
    console.warn(err);
    return new NextResponse(err, {
      status: 500,
    });
  }
}
