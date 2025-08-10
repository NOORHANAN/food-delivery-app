const express = require('express');
const router = express.Router();
const { getAllDiscounts } = require('../../functions/discount');

router.get('/', async (req, res) => {
  try {
    const discounts = await getAllDiscounts();
    res.json(discounts);
  } catch (error) {
    console.error("Error getting discounts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
