import { NextResponse } from "next/server";
import { sqlConfig } from "../layout";
const sql = require("mssql");

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  return NextResponse.json({ name, email });
}
