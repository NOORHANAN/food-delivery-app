-- USERS
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

-- CATEGORIES
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(60) NOT NULL,
    category_description VARCHAR(200) NOT NULL,
    image_url VARCHAR(550) DEFAULT NULL
);

-- RESTAURANTS
CREATE TABLE restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    image_url VARCHAR(550),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE menu_items (
    item_id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    image_url VARCHAR(550),
    tag VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);


-- DRINKS
CREATE TABLE drinks (
    drink_id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurants(restaurant_id),
    name VARCHAR(100),
    description TEXT,
    price NUMERIC(6, 2),
    image_url TEXT,
    tag VARCHAR(50)
);

-- CUSTOMERS
CREATE TABLE restaurant_customers (
    user_id  INTEGER NOT NULL,
    restaurant_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
    Foreign Key (user_id) REFERENCES users(user_id)
);

-- ORDERS
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
   
);

-- RATINGS
CREATE TABLE restaurant_ratings (
    rating_id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    reviews VARCHAR(230),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- ✅ FIXED BASKET TABLE
CREATE TABLE basket (
  basket_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  item_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  note TEXT,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (item_id) REFERENCES menu_items(item_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);


-- ✅ FIXED DELIVERY OPTIONS
CREATE TABLE delivery_options (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NULL,
    label TEXT NOT NULL, -- e.g. "Home", "Office"
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- PAYMENT METHODS
CREATE TABLE payment_methods (
    id SERIAL PRIMARY KEY,
    label TEXT NOT NULL -- e.g. "Apple Pay"
);

-- DISCOUNTS
CREATE TABLE discounts (
    id SERIAL PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    
    percentage INTEGER CHECK (percentage BETWEEN 0 AND 100)
);


CREATE TABLE delivery_addresses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  label TEXT NOT NULL, -- e.g., 'Home', 'Work', 'Parents'
  
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'Pakistan', -- Default to your main region
  
  full_address TEXT, -- optional, for quick display
  
  is_default BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  is_deleted BOOLEAN DEFAULT FALSE
);



CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    item_id INTEGER REFERENCES menu_items(item_id),
    quantity INTEGER,
    note TEXT,
     Foreign Key (order_id) REFERENCES orders (order_id)
);



