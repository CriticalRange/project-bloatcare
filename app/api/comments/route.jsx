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
  /* const pool = await db.connect(); */

  console.log("Post working");
  const res = await req.json();
  console.log(res);
  return NextResponse.json({ res });
}
