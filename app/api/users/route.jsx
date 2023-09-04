import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
const db = require("../db");
const bcrypt = require("bcrypt");

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
    const pool = await db.connect();
    const tableName = "users";
    const newUserUid = uuidv4();
    const now = new Date();
    const utcMilllisecondsSinceEpoch =
      now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);
    const decodedPassword = verify(
      res.Password,
      process.env.JWT_AUTH_SECRET_KEY
    );
    const hashedPassword = await bcrypt.hash(decodedPassword, 10);

    const userCreateRequest = [
      {
        Custom_Claims: JSON.stringify({}),
        Disabled: 0,
        Display_Name: res.Display_Name,
        Email: res.Email,
        Email_Verified: 0,
        Metadata: JSON.stringify({
          creationTime: now,
          lastSignInTime: now,
        }),
        Password_Hash: hashedPassword,
        Password_Salt: 10,
        Phone_Number: res.Phone_Number,
        Photo_URL: null,
        Provider_Data: JSON.stringify({
          providerId: "password",
          email: res.Email,
          uid: res.Email,
        }),
        Tokens_Valid_After_Time: null,
        Uid: newUserUid,
      },
    ];

    userCreateRequest.forEach(async (item) => {
      const userCreateQuery = `
      INSERT INTO ${tableName} (Custom_Claims, Disabled, Display_Name, Email, Email_Verified, Metadata, Password_Hash, Password_Salt, Phone_Number, Photo_URL, Provider_Data, Tokens_Valid_After_Time, Uid) VALUES ('${item.Custom_Claims}', '${item.Disabled}', '${item.Display_Name}', '${item.Email}', '${item.Email_Verified}', '${item.Metadata}', '${item.Password_Hash}', '${item.Password_Salt}', '${item.Phone_Number}', '${item.Photo_URL}', '${item.Provider_Data}', '${item.Tokens_Valid_After_Time}', '${item.Uid}')
      `;
      await pool.query(userCreateQuery);
    });

    return NextResponse.json(
      { uid: newUserUid },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: { message: `${err}` } },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(req) {
  const url = new URL(req.url);
  const userUid = url.searchParams.get("userUid");

  try {
    const pool = await db.connect();

    const userDeleteQuery = `DELETE FROM users WHERE [Uid] = '${userUid}'`;
    await pool.query(userDeleteQuery);

    return NextResponse.json(
      {
        success: "true",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: { message: `${err}` } },
      {
        status: 400,
      }
    );
  }
}
