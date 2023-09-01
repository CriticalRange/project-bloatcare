import { NextResponse } from "next/server";
import { sqlConfig } from "../layout";
const sql = require("mssql");

export async function POST(req, res) {
  try {
    return NextResponse(req.body);
  } catch (error) {
    return NextResponse("error: ");
  }
}
