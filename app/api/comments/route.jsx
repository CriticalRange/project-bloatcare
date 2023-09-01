import { NextResponse } from "next/server";
import { sqlConfig } from "../layout";
const sql = require("mssql");

export async function POST(request) {
  const res = await request.json();
  return NextResponse.json({ res });
}
