const express = require('express');
const router = express.Router();
const menuController = require('../../functions/menu'); // adjust path if needed

// Define routes
router.post('/', menuController.createMenuItem);
router.get('/:restaurantId', menuController.getMenuItemsByRestaurant);
router.put('/:id', menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router;
