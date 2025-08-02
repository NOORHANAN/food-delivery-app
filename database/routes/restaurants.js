// /database/routes/restaurants.js

const express = require("express");
const router = express.Router();

const getRestaurantsByCategoryId = require("../../functions/restaurants/getRestaurantsByCategoriesId");
const getRestaurantById = require("../../functions/restaurants/getRestaurantById"); 

router.get("/category/:categoryId", getRestaurantsByCategoryId);
router.get("/:id", getRestaurantById); 

module.exports = router;
