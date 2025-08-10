const pool = require('../database/database'); // your DB pool

// Get all addresses for a user
async function getAddresses(userId) {
  const res = await pool.query(
    `SELECT * FROM delivery_addresses WHERE user_id = $1 AND is_deleted = FALSE`,
    [userId]
  );
  return res.rows;
}

// Add new address
async function addAddress(
  user_id,
  label,
  street,
  city,
  state,
  postal_code,
  country,
  is_default
) {
  const res = await pool.query(
    `INSERT INTO delivery_addresses (user_id, label, street, city, state, postal_code, country, is_default) 
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [user_id, label, street, city, state, postal_code, country, is_default]
  );
  return res.rows[0];
}

// Update existing address
async function updateAddress(
  id,
  label,
  street,
  city,
  state,
  postal_code,
  country,
  is_default
) {
  const res = await pool.query(
    `UPDATE delivery_addresses SET label=$1, street=$2, city=$3, state=$4, postal_code=$5, country=$6, is_default=$7 WHERE id=$8 RETURNING *`,
    [label, street, city, state, postal_code, country, is_default, id]
  );
  return res.rows[0];
}

// Soft delete address
async function deleteAddress(id) {
  const res = await pool.query(
    `UPDATE delivery_addresses SET is_deleted=TRUE WHERE id=$1 RETURNING *`,
    [id]
  );
  return res.rows[0];
}

module.exports = {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
};
