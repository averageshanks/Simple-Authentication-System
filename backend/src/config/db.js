import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
const checkDBConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`🟢 MySQL connected! DB: ${connection.config.database}`);
    connection.release();
  } catch (error) {
    console.error("❌ MySQL connection FAILED", error);
    process.exit(1);
  }
};

export { pool, checkDBConnection };