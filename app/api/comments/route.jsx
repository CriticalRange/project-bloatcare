import { NextResponse } from "next/server";

export async function GET(req, res) {
  return NextResponse.json({
    required: {
      authorized: false,
      name: "John Doe",
    },
  });
}

export async function POST(req) {
  // make sure that any items are correctly URL encoded in the connection string
  console.log("- Connecting to Azure SQL Database...");
  await sql.connect(sqlConfig);
  console.log("- Successfully connected to Azure SQL Database!");
  console.log("Post working");
  const res = await req.json();
  console.log(res);
  return NextResponse.json({ res });
}
