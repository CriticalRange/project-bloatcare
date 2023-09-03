import { NextResponse } from "next/server";
import { sqlConfig } from "../../layout";
const sql = require("mssql");

export async function GET(req) {
  return NextResponse.json(
    {
      warning: {
        code: "requires_postId",
        message:
          "Please provide the Post's id to get the information. Example: /api/posts/IEYym5oKKimKrKUURsbg",
      },
    },
    {
      status: 405,
    }
  );
}
