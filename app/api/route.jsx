import { NextResponse } from "next/server";

export async function GET(req, res) {
  return new NextResponse("Hey this is my API running 🥳");
}
