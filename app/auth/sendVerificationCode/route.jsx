import { NextResponse } from "next/server";

const db = require("../../api/db");
const { EmailClient } = require("@azure/communication-email");

export async function POST(req) {
  const res = await req.json();
  const { Email } = res;

  try {
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

    const verificationCode = generateVerificationCode(6); // 6 karakterlik bir kod oluşturuluyor

    console.log("Verification code is: ", verificationCode);

    // @ts-ignore
    const pool = await db.connect();

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

    if (emailQueryResult.recordset.length === 0) {
      return NextResponse.json({
        error: {
          code: "user_not_found",
          message: `User with the email ${Email} was not found.`,
        },
      });
    }

    let userInfo = {};
    emailQueryResult.recordset.forEach((item) => {
      userInfo = {
        ...item,
      };
    });
    console.log(verificationCode, Email);

    const insertVerificationCodeQuery = `UPDATE [users]
    SET Verification_Code = '${verificationCode}'
    WHERE Email = '${Email}'`;
    await pool.query(insertVerificationCodeQuery);

    const connectionString =
      "endpoint=https://bloatcare.unitedstates.communication.azure.com/;accesskey=52oEsvMtBvR8t0oRnsIz0o18ohqJBtp66MAW4wGgD5Zq3h45NUcd0yvP1TJ+5dsU/eVR5o5iKSCv1EoLr6PM9Q==";
    const client = new EmailClient(connectionString);

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

    const poller = await client.beginSend(emailMessage);
    const result = await poller.pollUntilDone();

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
