const pool = require('../../database/database');

const getRestaurantById = async (req, res) => {
  const restaurantId = req.params.id;
  console.log("Getting restaurant with ID:", restaurantId);

  try {
    const restaurantQuery = `SELECT * FROM restaurants WHERE restaurant_id = $1`;
    const menuQuery = `SELECT item_id, name, price, description, image_url, tag FROM menu_items WHERE restaurant_id = $1`;
    const drinkQuery = `SELECT drink_id as id, name, price, image_url, tag FROM drinks WHERE restaurant_id = $1`;

    const [restaurantResult, menuResult, drinkResult] = await Promise.all([
      pool.query(restaurantQuery, [restaurantId]),
      pool.query(menuQuery, [restaurantId]),
      pool.query(drinkQuery, [restaurantId])
    ]);

    if (restaurantResult.rows.length === 0) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const restaurant = restaurantResult.rows[0];

    // Generate a "for_you" section dynamically (like featured items)
    const forYouItems = menuResult.rows.slice(0, 2).map((item, index) => ({
      id: item.item_id,
      name: item.name,
      price: item.price,
      image_url: item.image_url || "http://YOUR_IP:3000/images/default.jpg",
      tag: index === 0 ? "Best Seller" : undefined
    }));

    res.json({
      id: restaurant.restaurant_id,
      name: restaurant.restaurant_name,
      description: restaurant.description,
      avg_rating: restaurant.rating || 4.5,
      rating_count: restaurant.rating_count || 1000,
      distance_km: restaurant.distance_km || 2.4,
      delivery_fee: restaurant.delivery_fee,
      offers: true, // Add offers flag here
      image_url: restaurant.image_url || "http://YOUR_IP:3000/images/default_banner.jpg",
      tags: restaurant.tags || ["Healthy", "Fresh"],
      for_you: forYouItems,
      menu: menuResult.rows.map(item => ({
        id: item.item_id,
        name: item.name,
        description: item.description || "",
        price: item.price,
        image_url: item.image_url || "http://YOUR_IP:3000/images/default.jpg",
        tag: item.tag
      })),
      drinks: drinkResult.rows.map(drink => ({
        id: drink.id,
        name: drink.name,
        price: drink.price,
        image_url: drink.image_url || "http://YOUR_IP:3000/images/default.jpg",
        tag: drink.tag
      }))
    });

  } catch (error) {
    console.error("Error in getRestaurantById:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getRestaurantById;
