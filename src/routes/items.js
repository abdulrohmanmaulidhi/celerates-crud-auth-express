import express from "express";
import { client } from "../config/db.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

// Get all data
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM data ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
});

// Get single data by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query("SELECT * FROM data WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
});

// Create new data
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await client.query("INSERT INTO data (title, description) VALUES ($1, $2) RETURNING *", [title, description]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating data:", error);
    res.status(500).json({ message: "Error creating data", error: error.message });
  }
});

// Update data
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const result = await client.query("UPDATE data SET title = $1, description = $2 WHERE id = $3 RETURNING *", [title, description, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Error updating data", error: error.message });
  }
});

// Delete data
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query("DELETE FROM data WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Error deleting data", error: error.message });
  }
});

export default router;
