const express = require('express');
const router = express.Router();

const {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} = require('../../functions/deliveryoption');

router.get('/:userId', async (req, res) => {
  try {
    const addresses = await getAddresses(req.params.userId);
    res.json(addresses);
  } catch (err) {
    console.error("Error fetching addresses:", err);
    res.status(500).json({ error: "Failed to fetch addresses" });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      user_id,
      label,
      street,
      city,
      state,
      postal_code,
      country,
      is_default,
    } = req.body;

    if (!user_id || !label || !street || !city) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newAddress = await addAddress(
      user_id,
      label,
      street,
      city,
      state,
      postal_code,
      country,
      is_default
    );
    res.status(201).json(newAddress);
  } catch (err) {
    console.error("Error adding address:", err);
    res.status(500).json({ error: "Failed to add address" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {
      label,
      street,
      city,
      state,
      postal_code,
      country,
      is_default,
    } = req.body;

    if (!label || !street || !city) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedAddress = await updateAddress(
      req.params.id,
      label,
      street,
      city,
      state,
      postal_code,
      country,
      is_default
    );
    res.json(updatedAddress);
  } catch (err) {
    console.error("Error updating address:", err);
    res.status(500).json({ error: "Failed to update address" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedAddress = await deleteAddress(req.params.id);
    res.json(deletedAddress);
  } catch (err) {
    console.error("Error deleting address:", err);
    res.status(500).json({ error: "Failed to delete address" });
  }
});

module.exports = router;
