
const express = require('express');
const cors = require('cors');

const welcome = require('./functions/welcome');
const signup = require('./functions/signup');
const login = require('./functions/login');
const authenticateToken = require('./functions/authenticateToken');
const menuRoutes = require('./database/routes/menu_route'); // ✅ CORRECT
const categoryRoutes = require('./database/routes/categories');
const restaurantRoutes = require("./database/routes/restaurants");
const orderRoutes = require('./database/routes/order_route');






const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', welcome);
app.post('/signup', signup);
app.post('/login', login);

// ✅ Mount router
app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);
app.use('/categories', categoryRoutes);
app.use('/restaurants', restaurantRoutes);
app.use("/api/restaurants", restaurantRoutes);


app.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'This is protected', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
