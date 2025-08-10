const express = require('express');
const router = express.Router();
const {
  addItemToBasket,
  getBasketItems,
  updateBasketItem,
  deleteBasketItem,
} = require('../../functions/basket');

router.post('/', addItemToBasket);
router.get('/', getBasketItems);
router.put('/:item_id', updateBasketItem);
router.delete('/:item_id', deleteBasketItem);

module.exports = router;
