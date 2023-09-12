import { NextResponse } from "next/server";

const db = require("../../api/db");
const { EmailClient } = require("@azure/communication-email");

// POST Request for /auth/sendVerificationCode api
export async function POST(req) {
  const res = await req.json();
  // Get the Email from request body
  const { Email } = res;

  try {
    // A function that generates random 6 pins
    function generateVerificationCode(length) {
      const characters =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      let code = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
      }
      return code;
    }

    // Run the function and get that random 6 pins
    const verificationCode = generateVerificationCode(6); // 6 karakterlik bir kod oluşturuluyor

    // @ts-ignore Connect to server
    const pool = await db.connect();

    // Get the user info with the Email attached to it
    const emailQueryResult = await pool.request().query`SELECT [Custom_Claims]
    ,[Disabled]
    ,[Display_Name]
    ,[Email]
    ,[Email_Verified]
    ,[Metadata]
    ,[Photo_URL]
    ,[Provider_Data]
    ,[Uid]
    ,[Password_Hash]
    ,[Phone_Number]
    ,[Password_Salt]
    ,[Tokens_Valid_After_Time]
      FROM [dbo].[users]
      WHERE [Email] = ${Email}`;

    // If it doesn't exist
    if (emailQueryResult.recordset.length === 0) {
      return NextResponse.json({
        error: {
          code: "user_not_found",
          message: `User with the email ${Email} was not found.`,
        },
      });
    }

    // Map the info to userInfo
    let userInfo = {};
    emailQueryResult.recordset.forEach((item) => {
      userInfo = {
        ...item,
      };
    });

    // Send the verification code to database
    const insertVerificationCodeQuery = `UPDATE [users]
    SET Verification_Code = '${verificationCode}'
    WHERE Email = '${Email}'`;
    await pool.query(insertVerificationCodeQuery);

    // The connection string to Azure Communications Service
    const connectionString =
      "endpoint=https://bloatcare.unitedstates.communication.azure.com/;accesskey=52oEsvMtBvR8t0oRnsIz0o18ohqJBtp66MAW4wGgD5Zq3h45NUcd0yvP1TJ+5dsU/eVR5o5iKSCv1EoLr6PM9Q==";

    // Create the email client
    const client = new EmailClient(connectionString);

    // Custom Email Message to send
    const emailMessage = {
      senderAddress:
        "DoNotReply@d61d4759-24a6-49ec-b76b-953edd71bfc2.azurecomm.net",
      content: {
        subject: "BloatCare E-Mail Verification",
        plainText: `Your E-Mail verification code is: ${JSON.stringify(
          verificationCode
        )}.`,
      },
      recipients: {
        to: [{ address: `${Email}` }],
      },
    };

    // Send the email with the Verification Code
    const poller = await client.beginSend(emailMessage);
    const result = await poller.pollUntilDone();

    // Also return the verification code
    return NextResponse.json(
      {
        verification_code: verificationCode,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json({
      error: err,
    });
  }
}
