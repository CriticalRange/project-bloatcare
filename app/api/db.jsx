// Database connections page

const sql = require("mssql");

// SQL Server config resides here
export const sqlConfig = {
  user: process.env.NEXT_PUBLIC_DB_USERNAME,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  server: process.env.NEXT_PUBLIC_DB_ADDRESS,
  database: "BloatCare",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    port: 1433,
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export const accessSecret = new TextEncoder().encode(
  `${process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET_KEY}`
);

export const refreshSecret = new TextEncoder().encode(
  `${process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET_KEY}`
);

export const accessAlg = process.env.NEXT_PUBLIC_ACCESS_JWT_ALGORITHM;

export const refreshAlg = process.env.NEXT_PUBLIC_REFRESH_JWT_ALGORITHM;

// Create the connection pool
const pool = new sql.ConnectionPool(sqlConfig);

// Connect and return the connection pool
async function connect() {
  try {
    await pool.connect();
    console.log("Successfully connected to the database");
    return pool;
  } catch (err) {
    console.error("Connection error:", err);
    throw err;
  }
}

module.exports = {
  connect,
  accessSecret,
  refreshSecret,
  accessAlg,
  refreshAlg,
};
