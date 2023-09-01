import { NextResponse } from "next/server";
import { sqlConfig } from "./layout";
const sql = require("mssql");

export async function GET(req, res) {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    console.log("- Connecting to Azure SQL Database...");
    await sql.connect(sqlConfig);
    console.log("- Successfully connected to Azure SQL Database!");
    const result = await sql.query`SELECT TOP (1000) [Display_Name]
    FROM [bloatcare].[dbo].[users]`;
    return new NextResponse(JSON.stringify(result));
    sql.close();
  } catch (err) {
    console.warn(err);
    return new NextResponse(err);
  }
  return new NextResponse("API is running without errors");
}
