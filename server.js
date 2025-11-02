import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Client } from "pg";
import userRoutes from "./routes/users.js";
import dataRoutes from "./routes/data.js";
import initializeDatabase from "./db/init.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/items", dataRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the CRUD Auth API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { client };
