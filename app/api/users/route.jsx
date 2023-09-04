import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json(
    {
      warning: {
        code: "requires_user_uid",
        message:
          "Please provide the User's Uid to get the information from. Example: /api/users/T1prvvDyk9I4ReemL6RI",
      },
    },
    {
      status: 303,
    }
  );
}

export async function POST(req) {
  const res = await req.json();

  try {
    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.json(
      { error: { message: `${err}` } },
      {
        status: 400,
      }
    );
  }
}
