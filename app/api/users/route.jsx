import { NextResponse } from "next/server";

export async function GET(req, res) {
  return NextResponse.json(
    {
      warning: {
        code: "requires_user_uid",
        message:
          "Please provide the User's Uid to get the information from. Example: /api/users/T1prvvDyk9I4ReemL6RI",
      },
    },
    {
      status: 200,
    }
  );
}
