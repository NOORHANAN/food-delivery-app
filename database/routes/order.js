const express = require('express');
const router = express.Router();

const { placeOrder, getOrdersByUser } = require('../../functions/order');

// POST /orders - Place a new order
router.post('/', placeOrder);

// ✅ GET /orders/:user_id - Fetch all orders for a specific user
router.get('/:user_id', getOrdersByUser);

module.exports = router;
