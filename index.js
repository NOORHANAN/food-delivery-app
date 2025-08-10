const express = require('express');
const cors = require('cors');

const welcome = require('./functions/welcome');
const signup = require('./functions/signup');
const login = require('./functions/login');
const authenticateToken = require('./functions/authenticateToken');

const menuRoutes = require('./database/routes/menu_route');
const categoryRoutes = require('./database/routes/categories');
const restaurantRoutes = require("./database/routes/restaurants");
const basketRoutes = require('./database/routes/basket_route');
const payMethodRoutes = require('./database/routes/paymethod');
//const deliveryOptionRoute = require("./routes/deliveryoptions");
const deliveryOptionRoute = require('./database/routes/deliveryoption'); 

const discountRoutes = require("./database/routes/discount");
const orderRoutes = require('./database/routes/order'); // ✅ Renamed for clarity






const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Auth routes
app.get('/', welcome);
app.post('/signup', signup);
app.post('/login', login);

// Feature routes
app.use('/menu', menuRoutes);
app.use('/categories', categoryRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/api/restaurants', restaurantRoutes); // Optional: remove if not used
app.use('/basket', basketRoutes);
app.use('/payment-methods', payMethodRoutes);
app.use('/delivery-options', deliveryOptionRoute);
app.use('/discounts', discountRoutes);
app.use('/orders', orderRoutes); 

// Protected test route
app.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'This is protected', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
