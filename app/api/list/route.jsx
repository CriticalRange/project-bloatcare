import { NextResponse } from "next/server";

export async function GET(req, res) {
  return NextResponse.json(
    {
      comments: "/api/comments/",
      list: "/api/list",
    },
    {
      status: 200,
    }
  );
}
