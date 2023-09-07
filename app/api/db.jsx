// db.js

const sql = require("mssql");

export const sqlConfig = {
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  server: process.env.NEXT_PUBLIC_DB_NAME,
  database: "bloatcare",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    port: 1433,
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export const accessSecret = new TextEncoder().encode(
  `${process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET_KEY}`
);

export const refreshSecret = new TextEncoder().encode(
  `${process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET_KEY}`
);

export const accessTokenAlgorithm = process.env.NEXT_PUBLIC_JWT_ALGORITHM;

// Bağlantı havuzunu oluştur
const pool = new sql.ConnectionPool(sqlConfig);

// Bağlantıyı aç ve bağlantı havuzunu döndür
async function connect() {
  try {
    await pool.connect();
    console.log("Veritabanına başarıyla bağlandı.");
    return pool;
  } catch (err) {
    console.error("Bağlantı hatası:", err);
    throw err;
  }
}

module.exports = {
  connect,
  accessSecret,
  refreshSecret,
  accessTokenAlgorithm,
};
