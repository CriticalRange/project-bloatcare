import { NextResponse } from "next/server";

export async function GET(req, res) {
  return NextResponse.json(
    {
      warning: {
        requires: "userUid",
      },
    },
    {
      status: 200,
    }
  );
}
