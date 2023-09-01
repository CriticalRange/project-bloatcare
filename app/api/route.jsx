import { NextResponse } from "next/server";
import { sqlConfig } from "./layout";
const sql = require("mssql");

export async function GET(req, res) {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    console.log("Connecting");
    await sql.connect(sqlConfig);
    console.log("Connected");
    const result = await sql.query`SELECT TOP (1000) [Display_Name]
    FROM [bloatcare].[dbo].[users]`;
    return new NextResponse(JSON.stringify(result));
    sql.close();
  } catch (err) {
    console.log(err);
  }
  return new NextResponse("Hey this is my API running 🥳");
}
