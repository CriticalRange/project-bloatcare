import { NextResponse } from "next/server";
import { sqlConfig } from "./layout";
const sql = require("mssql");

export async function GET(req, res) {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    console.log("- Connecting to Azure SQL Database...");
    await sql.connect(sqlConfig);
    console.log("- Successfully connected to Azure SQL Database!");
    return new NextResponse("API is operation", {
      status: 204,
    });
    sql.close();
  } catch (err) {
    console.warn(err);
    return new NextResponse(err, {
      status: 500,
    });
  }
  return new NextResponse("API is running without errors", {
    status: 200,
  });
}
