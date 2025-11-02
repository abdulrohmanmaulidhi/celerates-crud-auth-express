import { Client } from "pg";
import initializeDatabase from "../db/init.js";

// PostgreSQL Connection
const client = new Client({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "crud_auth_db",
  password: process.env.DB_PASSWORD || "postgres",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
    // Initialize database tables
    initializeDatabase();
  })
  .catch((err) => console.error("Database connection error:", err));

export { client };
