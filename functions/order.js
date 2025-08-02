const pool = require('../database/database');

const addItemToOrder = async (req, res) => {
  const { item_id, quantity, note } = req.body;

  try {
    // 1. Check if there's a cart order (status = 'cart')
    let result = await pool.query(
      `SELECT * FROM orders WHERE customer_id = 1 AND status = 'cart' LIMIT 1`
    );

    let order;
    if (result.rows.length === 0) {
      // Create new cart order
      const newOrder = await pool.query(
        `INSERT INTO orders (customer_id, restaurant_id, total_amount, status)
         VALUES (1, 1, 0, 'cart') RETURNING *`
      );
      order = newOrder.rows[0];
    } else {
      order = result.rows[0];
    }

    // 2. Add item to order_items
    await pool.query(
      `INSERT INTO order_items (order_id, item_id, quantity, note)
       VALUES ($1, $2, $3, $4)`,
      [order.order_id, item_id, quantity, note]
    );

    res.status(201).json({ message: "Item added to basket", order_id: order.order_id });
  } catch (err) {
    console.error("Error adding item:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCartItems = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT mi.name, mi.price, oi.quantity, oi.note
       FROM order_items oi
       JOIN orders o ON o.order_id = oi.order_id
       JOIN menu_items mi ON mi.item_id = oi.item_id
       WHERE o.customer_id = 1 AND o.status = 'cart'`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addItemToOrder,
  getCartItems,
  // other exports...
};
