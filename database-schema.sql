
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);


CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(60) NOT NULL,
    category_description VARCHAR(200) NOT NULL,
    image_url VARCHAR(550) DEFAULT NULL
);


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
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(550),
    tag VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);


CREATE TABLE drinks (
    drink_id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurants(restaurant_id),
    name VARCHAR(100),
    description TEXT,
    price NUMERIC(6, 2),
    image_url TEXT,
    tag VARCHAR(50)
);


CREATE TABLE restaurant_customers (
    customer_id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);


CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES restaurant_customers(customer_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);


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



CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id),
    item_id INTEGER REFERENCES menu_items(item_id),
    quantity INTEGER,
    note TEXT
);
