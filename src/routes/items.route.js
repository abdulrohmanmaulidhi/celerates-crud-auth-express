import express from "express";
import authenticateToken from "../middleware/auth.js";
import { getItems, getItem, createItems, updateItem, deleteItem } from "../controllers/items.controller.js";

const router = express.Router();

// Get all data
router.get("/", authenticateToken, getItems);

// Get single data by ID
router.get("/:id", authenticateToken, getItem);

// Create new data
router.post("/", authenticateToken, createItems);

// Update data
router.put("/:id", authenticateToken, updateItem);

// Delete data
router.delete("/:id", authenticateToken, deleteItem);

export default router;
