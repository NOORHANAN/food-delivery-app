const pool = require('../database/database');

// ✅ POST: Add to basket
const addItemToBasket = async (req, res) => {
  const { user_id, item_id, quantity, note } = req.body;

  try {
    const itemResult = await pool.query(
      `SELECT price, restaurant_id FROM menu_items WHERE item_id = $1`,
      [item_id]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    const { price, restaurant_id } = itemResult.rows[0];

    const existing = await pool.query(
      `SELECT 1 FROM basket WHERE user_id = $1 AND item_id = $2`,
      [user_id, item_id]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        `UPDATE basket SET quantity = quantity + $1, note = $2 WHERE user_id = $3 AND item_id = $4`,
        [quantity, note, user_id, item_id]
      );
    } else {
      await pool.query(
        `INSERT INTO basket (user_id, item_id, quantity, note, restaurant_id, price)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [user_id, item_id, quantity, note, restaurant_id, price]
      );
    }

    res.status(201).json({ message: "Item added to basket" });
  } catch (err) {
    console.error("Error adding item to basket:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ GET: Fetch basket items for a user
const getBasketItems = async (req, res) => {
  const user_id = Number(req.query.user_id);

  if (!user_id) return res.status(400).json({ message: "Missing user_id" });

  try {
    const result = await pool.query(
    `SELECT 
       b.item_id,
       b.note,
       SUM(b.quantity)::INT AS quantity,
       b.price::FLOAT8 AS price,  --  Convert to number
       mi.name,
       mi.image_url,
       r.name AS restaurant_name
     FROM basket b
     JOIN menu_items mi ON b.item_id = mi.item_id
     JOIN restaurants r ON r.restaurant_id = b.restaurant_id
     WHERE b.user_id = $1
     GROUP BY b.item_id, b.note, b.price, mi.name, mi.image_url, r.name
     ORDER BY mi.name`,
    [user_id]
  );


    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching basket items:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ PUT: Update quantity or note
const updateBasketItem = async (req, res) => {
  const { item_id } = req.params;
  const { user_id, quantity, note } = req.body;

  try {
    const result = await pool.query(
      `UPDATE basket SET quantity = $1, note = $2 WHERE item_id = $3 AND user_id = $4`,
      [quantity, note, item_id, user_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Item not found in basket" });
    }

    res.json({ message: "Basket item updated" });
  } catch (err) {
    console.error("Error updating basket item:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ DELETE: Remove item
const deleteBasketItem = async (req, res) => {
  const { item_id } = req.params;
  const user_id = Number(req.query.user_id);

  if (!user_id) return res.status(400).json({ message: "Missing user_id" });

  try {
    const result = await pool.query(
      `DELETE FROM basket WHERE item_id = $1 AND user_id = $2`,
      [item_id, user_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Item not found in basket" });
    }

    res.json({ message: "Item removed from basket" });
  } catch (err) {
    console.error("Error deleting basket item:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addItemToBasket,
  getBasketItems,
  updateBasketItem,
  deleteBasketItem,
};
