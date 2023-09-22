import { NextResponse } from "next/server";
const db = require("./db");

// GET Function for /api
export async function GET(req) {
  try {
    // @ts-ignore Start the server
    const pool = await db.connect();

    return new NextResponse(
      "API is operational, documentation is here: https://app.swaggerhub.com/apis/CriticalRange/BloatCareApi/1.0.0",
      {
        status: 200,
      }
    );
  } catch (err) {
    console.warn(err);
    return new NextResponse(err, {
      status: 400,
    });
  }
}
