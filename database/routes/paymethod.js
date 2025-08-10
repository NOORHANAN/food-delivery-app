const express = require("express");
const router = express.Router();
const pool = require('../../database/database'); // Ensure correct DB connection

// GET /payment-methods
router.get("/payment-methods", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, label FROM payment_methods");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching payment methods:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
