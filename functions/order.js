const pool = require('../database/database');

const placeOrder = async (req, res) => {
  const { user_id, items } = req.body; // [{ item_id, quantity, note }]

  if (!user_id || !items || items.length === 0) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Get restaurant_id from the first item
    const firstItem = items[0];
    const restaurantResult = await client.query(
      `SELECT restaurant_id FROM menu_items WHERE item_id = $1`,
      [firstItem.item_id]
    );

    if (restaurantResult.rows.length === 0) {
      throw new Error("Menu item not found");
    }

    const restaurant_id = restaurantResult.rows[0].restaurant_id;

    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      const priceResult = await client.query(
        `SELECT price FROM menu_items WHERE item_id = $1`,
        [item.item_id]
      );

      if (priceResult.rows.length === 0) {
        throw new Error(`Item not found: ${item.item_id}`);
      }

      totalAmount += parseFloat(priceResult.rows[0].price) * item.quantity;
    }

    // Insert into orders table
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, restaurant_id, total_amount, status)
       VALUES ($1, $2, $3, 'pending')
       RETURNING order_id`,
      [user_id, restaurant_id, totalAmount]
    );

    const order_id = orderResult.rows[0].order_id;

    // Insert into order_items table
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, item_id, quantity, note)
         VALUES ($1, $2, $3, $4)`,
        [order_id, item.item_id, item.quantity, item.note || null]
      );
    }

    // Clear basket for this user
    await client.query(
      `DELETE FROM basket WHERE user_id = $1`,
      [user_id]
    );

    await client.query("COMMIT");

    res.status(201).json({
      message: "Order placed successfully",
      order_id,
    });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error placing order:", err.message);
    res.status(500).json({ message: "Failed to place order" });
  } finally {
    client.release();
  }
};

// ✅ Get all orders for a specific user
const getOrdersByUser = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const result = await pool.query(
      `SELECT o.order_id, o.total_amount, o.status, oi.item_id, oi.quantity, oi.note, m.name, m.price
       FROM orders o
       JOIN order_items oi ON o.order_id = oi.order_id
       JOIN menu_items m ON oi.item_id = m.item_id
       WHERE o.user_id = $1
       ORDER BY o.order_id DESC`,
      [user_id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

module.exports = {
  placeOrder,
  getOrdersByUser,
};
