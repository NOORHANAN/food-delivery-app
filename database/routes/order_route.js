const express = require('express');
const router = express.Router();
const orderController = require('../../functions/order');

router.post('/', orderController.addItemToOrder); // for "Add to Basket"
router.get('/cart', orderController.getCartItems); // for displaying in tab

module.exports = router;
