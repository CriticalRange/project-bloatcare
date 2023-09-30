import { NextResponse } from "next/server";
const db = require("../db");

// GET Request for comments api
export async function GET(req, res) {
  return NextResponse.json({
    required: {
      authorized: false,
      name: "John Doe",
    },
  });
}

// POST Request for comments api
export async function POST(req) {
  const res = await req.json();

  try {
    // @ts-ignore
    const pool = await db.connect();

    return NextResponse.json({
      comment_id: "comment_id",
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
