import { NextResponse } from "next/server";

export async function GET(req, res) {
  return NextResponse.json({
    required: {
      authorized: false,
      name: "John Doe",
    },
  });
}

export async function POST(req) {
  console.log("Post working");
  const res = await req.json();
  console.log(res);
  return NextResponse.json({ res });
}
