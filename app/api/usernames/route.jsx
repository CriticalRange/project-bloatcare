import { NextResponse } from "next/server";

export async function GET(req, res) {
  return NextResponse.json(
    {
      warning: {
        code: "requires_username",
        message:
          "Please provide the Username to get the information. Example: /api/usernames/cooly",
      },
    },
    {
      status: 303,
    }
  );
}
