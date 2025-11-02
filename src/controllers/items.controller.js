import { client } from "../config/db.js";

const getItems = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM items ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items", error: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query("SELECT * FROM items WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
};

const createItems = async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await client.query("INSERT INTO items (title, description) VALUES ($1, $2) RETURNING *", [title, description]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating data:", error);
    res.status(500).json({ message: "Error creating data", error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const result = await client.query("UPDATE items SET title = $1, description = $2 WHERE id = $3 RETURNING *", [title, description, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Error updating data", error: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query("DELETE FROM items WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Error deleting data", error: error.message });
  }
};

export { getItems, getItem, createItems, updateItem, deleteItem };
