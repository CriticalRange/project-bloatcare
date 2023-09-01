export const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_NAME,
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

// make sure that any items are correctly URL encoded in the connection string
console.log("- Connecting to Azure SQL Database...");
await sql.connect(sqlConfig);
console.log("- Successfully connected to Azure SQL Database!");

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return <section>{children}</section>;
}
