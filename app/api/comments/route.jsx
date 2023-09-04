import { NextResponse } from "next/server";
const db = require("../db");

export async function GET(req, res) {
  return NextResponse.json({
    required: {
      authorized: false,
      name: "John Doe",
    },
  });
}

export async function POST(req) {
  /* const res = await req.json(); */

  try {
    const pool = await db.connect();

    return NextResponse.json({
      comment_id: "comment_id",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: `${err}` } },
      {
        status: 400,
      }
    );
  }
}
