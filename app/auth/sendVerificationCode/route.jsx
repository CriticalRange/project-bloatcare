import { NextResponse } from "next/server";

const db = require("../../api/db");
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const { S3 } = require("@aws-sdk/client-s3");

// POST Request for /auth/sendVerificationCode api
export async function POST(req) {
  const res = await req.json();
  // Get the Email from request body
  const { Email } = res;
  const SES_CONFIG = {
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_EMAILER_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_EMAILER_SECRET_KEY,
    },
    region: process.env.NEXT_PUBLIC_AWS_EMAILER_REGION,
  };

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

    // Create the aws ses client
    const sesClient = new SESClient(SES_CONFIG);

    // Custom Email Message to send
    let params = {
      Source: "bloatcare@outlook.com",
      Destination: {
        ToAddresses: [userInfo.Email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Hello ${userInfo.Display_Name}!</title>
                <style>
                    body {
                        background-color: #f4f4f4;
                        font-family: Arial, sans-serif;
                        text-align: center;
                        margin: 0;
                        padding: 0;
                    }
            
                    .container {
                        background-color: #ffffff;
                        border-radius: 5px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                        max-width: 400px;
                        margin: 20px auto;
                        padding: 20px;
                    }
            
                    h1 {
                        color: #333;
                    }
            
                    p {
                        font-size: 16px;
                        margin-bottom: 20px;
                    }
            
                    .verification-code {
                        font-size: 24px;
                        font-weight: bold;
                        color: #007BFF;
                    }
            
                    .social-links {
                        margin-top: 20px;
                    }
            
                    .social-links a {
                        text-decoration: none;
                        color: #007BFF;
                        margin: 0 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>E-mail Verification Code</h1>
                    <p>Your E-mail Verification Code is:</p>
                    <p class="verification-code">${verificationCode}</p>
                    <p>Please enter this verification code while creating your account to continue.</p>
                    <div class="social-links">
                        <a href="#">Facebook</a>
                        <a href="#">Twitter</a>
                        <a href="#">Instagram</a>
                    </div>
                </div>
            </body>
            </html>`,
          },
          Text: {
            Charset: "UTF-8",
            Data: `Your verification code is: ${JSON.stringify(
              verificationCode
            )}`,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: `BloatCare E-Mail Verification`,
        },
      },
    };
    console.log("Sending email");
    // @ts-ignore Send the email with the Verification Code
    const sendEmailCommand = new SendEmailCommand(params);
    const result = await sesClient.send(sendEmailCommand);
    console.log("Email sent");

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
