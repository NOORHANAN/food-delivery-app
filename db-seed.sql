
INSERT INTO users (username, email, password)
VALUES 
('salman', 'salman.dev@sample.com', 'hashedpassword1'),
('essa', 'essa.khan@sample.com', 'hashedpassword2'),
('Asemumer','was@gmail.com', '12'),
('Asemumer','wass@gmail.com', '123'),
('Asemumer','wasi@gmail.com', '1234'),
('salmani', 'salmani.dev@sample.com', 'haaskakahedpassword1'),
('essakhan', 'essakhan.khan@sample.com', 'hakkshedpassword2'),
('Asemumerr','wasif@gmail.com', '122'),
('Asemumerii','wassiff@gmail.com', '1234'),
('Asemumeraj','wasid@gmail.com', '234'),
('salmankk', 'salmaniik.dev@sample.com', 'hashidedpassword1'),
('essaif', 'essakh.khan@sample.com', 'haishedpassword2'),
('Asemumar','wasda@gmail.com', '22'),
('Asemumur','wassid@gmail.com', '223'),
('Asemumor','wasifif@gmail.com', '2234');


INSERT INTO categories (category_name, category_description, image_url) VALUES
('Hamburger', 'Restaurants specializing in burgers and sandwich-style meals.', 'https://cdn-icons-png.flaticon.com/128/3075/3075977.png'),
('Pizza', 'Pizzerias serving a variety of traditional and modern pizzas.', 'https://cdn-icons-png.flaticon.com/128/6978/6978255.png'),
('Noodle', 'Places offering Asian-style noodles and ramen.', 'https://cdn-icons-png.flaticon.com/128/3041/3041130.png'),
('Meat', 'Meat-heavy menus like BBQ, steak, and kebabs.', 'https://cdn-icons-png.flaticon.com/128/1046/1046769.png'),
('Vegetable', 'Vegetarian and plant-based focused cuisine.', 'https://cdn-icons-png.flaticon.com/128/2153/2153786.png'),
('Dessert', 'Dessert shops offering cakes, ice creams, and sweets.', 'https://cdn-icons-png.flaticon.com/128/4465/4465242.png'),
('Drink', 'Juice bars, cafes, and beverage-focused spots.', 'https://cdn-icons-png.flaticon.com/128/2405/2405479.png'),
('Bread', 'Bakeries offering fresh, handmade bread loaves and buns.', 'https://cdn-icons-png.flaticon.com/128/3014/3014502.png'),
('Croissant', 'Specialty patisseries offering croissants and French pastries.', 'https://cdn-icons-png.flaticon.com/128/5787/5787330.png'),
('Pancakes', 'Breakfast spots with pancakes, waffles, and syrup-heavy dishes.', 'https://cdn-icons-png.flaticon.com/128/8688/8688560.png'),
('Cheese', 'Restaurants known for cheese-centric dishes and platters.', 'https://cdn-icons-png.flaticon.com/128/819/819827.png'),
('FrenchFries', 'Fries-focused fast food outlets and side dish experts.', 'https://cdn-icons-png.flaticon.com/128/5787/5787020.png');


INSERT INTO restaurants (name, address, phone, email, category_id, image_url) VALUES
('Burger Republic', '101 Burger Lane', '0311-1111111', 'info@burgerrepublic.com', 1, 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg'),
('Pizza Haven', '202 Mozzarella St', '0312-2222222', 'order@pizzahaven.com', 2, 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg'),
('Noodle House', '303 Wok Way', '0313-3333333', 'hello@noodlehouse.com', 3, 'https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg'),
('Meat Feast Grill', '404 BBQ Blvd', '0314-4444444', 'grill@meatfeast.com', 4, 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg'),
('Green Leaf Bites', '505 Veggie Ave', '0315-5555555', 'support@greenleaf.com', 5, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'),
('Sweet Tooth', '606 Sugar St', '0316-6666666', 'contact@sweettooth.com', 6, 'https://images.pexels.com/photos/3026801/pexels-photo-3026801.jpeg'),
('Sip & Chill', '707 Beverage Rd', '0317-7777777', 'hello@sipnchill.com', 7, 'https://images.pexels.com/photos/1239303/pexels-photo-1239303.jpeg'),
('Bread Box', '808 Loaf Street', '0318-8888888', 'info@breadbox.com', 8, 'https://images.pexels.com/photos/2434/bread-food-healthy-breakfast.jpg'),
('Paris Bakes', '909 Croissant Blvd', '0319-9999999', 'paris@croissants.com', 9, 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg'),
('Fluffy Stack', '1010 Pancake Plaza', '0320-0000000', 'fluffy@pancakestack.com', 10, 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg'),
('Cheese Cave', '111 Cheddar Alley', '0321-1111111', 'melt@cheesecave.com', 11, 'https://images.pexels.com/photos/236781/pexels-photo-236781.jpeg'),
('Fry Station', '1212 Crunchy Rd', '0322-2222222', 'fries@frystation.com', 12, 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg');






INSERT INTO menu_items (restaurant_id, name, description, price, image_url, tag) VALUES
(1, 'Cheeseburger', 'A classic beef patty with cheddar cheese, lettuce, tomato, and onion on a brioche bun.', 12.50, 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80', 'Entree'),
(3, 'French Fries', 'Crispy, golden French fries seasoned with sea salt.', 4.00, 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80', 'Side'),
(5, 'Caesar Salad', 'Romaine lettuce with parmesan, croutons, and Caesar dressing.', 9.75, 'https://images.unsplash.com/photo-1572441710534-014a62b8f7e8?auto=format&fit=crop&w=800&q=80', 'Appetizer'),
(6, 'Margherita Pizza', 'Tomato sauce, fresh mozzarella, and basil.', 18.00, 'https://images.unsplash.com/photo-1601924638867-3ec8f5f9c3c5?auto=format&fit=crop&w=800&q=80', 'Entree'),
(8, 'Garlic Bread', 'Toasted bread with garlic butter and herbs.', 6.50, 'https://images.unsplash.com/photo-1604908811995-0d0a81c92d5a?auto=format&fit=crop&w=800&q=80', 'Appetizer'),
(9, 'Coca-Cola', 'A refreshing classic.', 3.00, 'https://images.unsplash.com/photo-1599909469643-46bbdb8215e7?auto=format&fit=crop&w=800&q=80', 'Drink'),
(3, 'Chicken Pad Thai', 'Stir-fried rice noodles with chicken, peanuts, bean sprouts, and lime.', 15.25, 'https://images.unsplash.com/photo-1625941211960-1b6a5c0a10ae?auto=format&fit=crop&w=800&q=80', 'Entree'),
(5, 'Spring Rolls', 'Crispy rolls filled with vegetables, served with a sweet chili sauce.', 8.50, 'https://images.unsplash.com/photo-1650971959537-1f7e3826c7da?auto=format&fit=crop&w=800&q=80', 'Appetizer'),
(1, 'Thai Iced Tea', 'Sweet Thai tea with cream.', 5.50, 'https://images.unsplash.com/photo-1625602248989-d8aee0b9cbbc?auto=format&fit=crop&w=800&q=80', 'Drink'),
(1, 'Veggie Burger', 'A black bean patty with lettuce, tomato, and avocado.', 11.00, 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80', 'Entree'),
(3, 'Onion Rings', 'Crispy fried onion rings.', 6.00, 'https://images.unsplash.com/photo-1662041068015-e108e7f97c50?auto=format&fit=crop&w=800&q=80', 'Side'),
(2, 'Pepperoni Pizza', 'Classic pizza with pepperoni slices.', 19.50, 'https://images.unsplash.com/photo-1601924572872-b421e5c1e952?auto=format&fit=crop&w=800&q=80', 'Entree'),
(7, 'Tiramisu', 'Layered coffee-flavored Italian dessert.', 7.00, 'https://images.unsplash.com/photo-1623156344720-68ef8ad4af9d?auto=format&fit=crop&w=800&q=80', 'Dessert'),
(8, 'Green Curry', 'Spicy green curry with coconut milk and vegetables.', 16.00, 'https://images.unsplash.com/photo-1587399384201-b30b4e3f1b5c?auto=format&fit=crop&w=800&q=80', 'Entree'),
(10, 'Mango Sticky Rice', 'Sweet sticky rice with fresh mango.', 9.00, 'https://images.unsplash.com/photo-1589968133759-760c3fdf3071?auto=format&fit=crop&w=800&q=80', 'Dessert'),
(9, 'Chicken Wings', 'Crispy chicken wings tossed in your choice of sauce.', 10.50, 'https://images.unsplash.com/photo-1604908177526-b69b39442df4?auto=format&fit=crop&w=800&q=80', 'Appetizer'),
(7, 'Espresso', 'A strong shot of espresso.', 3.50, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', 'Drink'),
(4, 'Chicken Satay', 'Grilled chicken skewers with a peanut dipping sauce.', 9.50, 'https://images.unsplash.com/photo-1606208367524-17328452bd3c?auto=format&fit=crop&w=800&q=80', 'Appetizer'),
(1, 'Milkshake', 'Classic vanilla milkshake.', 7.00, 'https://images.unsplash.com/photo-1590080876800-572c24b69f02?auto=format&fit=crop&w=800&q=80', 'Drink'),
(2, 'Fettuccine Alfredo', 'Fettuccine pasta in a creamy alfredo sauce.', 14.75, 'https://images.unsplash.com/photo-1617196034793-27fdbac77c5a?auto=format&fit=crop&w=800&q=80', 'Entree');


INSERT INTO drinks (restaurant_id, name, description, price, image_url, tag) VALUES
(1, 'Coca-Cola', 'Classic refreshing soft drink.', 1.99, 'https://example.com/images/coca-cola.jpg', 'Cold'),
(1, 'Pepsi', 'Popular cola beverage with a bold taste.', 1.89, 'https://example.com/images/pepsi.jpg', 'Cold'),
(1, 'Lemonade', 'Fresh squeezed lemon juice with a hint of mint.', 2.49, 'https://example.com/images/lemonade.jpg', 'Fresh'),
(2, 'Iced Tea', 'Chilled black tea with lemon flavor.', 2.29, 'https://example.com/images/iced-tea.jpg', 'Iced'),
(2, 'Orange Juice', 'Freshly squeezed orange juice.', 2.99, 'https://example.com/images/orange-juice.jpg', 'Fresh'),
(2, 'Mango Smoothie', 'Sweet mango blended with yogurt.', 3.49, 'https://example.com/images/mango-smoothie.jpg', 'Healthy');


INSERT INTO restaurant_customers (restaurant_id, user_id,name, email, phone) VALUES
(1,1, 'John Doe', 'john.doe@example.com', '555-123-4567'),
(2, 2,'Jane Smith', 'jane.smith@example.com', '555-987-6543'),
(1, 3,'Michael Johnson', 'michael.j@example.com', '555-111-2222'),
(3, 4,'Emily Davis', 'emily.d@example.com', '555-333-4444'),
(2, 5,'Chris Wilson', 'chris.w@example.com', '555-555-6666'),
(10, 6,'Jessica Brown', 'jessica.b@example.com', '555-777-8888'),
(1, 7,'David Miller', 'david.m@example.com', '555-999-0000'),
(12, 8,'Sarah Taylor', 'sarah.t@example.com', '555-456-7890'),
(11, 9,'Robert Anderson', 'robert.a@example.com', '555-654-3210'),
(3, 11,'Linda Thomas', 'linda.t@example.com', '555-123-9876'),
(10, 12,'Paul White', 'paul.w@example.com', '555-234-5678'),
(8, 13,'Karen Harris', 'karen.h@example.com', '555-345-6789'),
(7, 2,'Mark Garcia', 'mark.g@example.com', '555-456-1234'),
(7, 3,'Nancy Martinez', 'nancy.m@example.com', '555-567-8901'),
(6, 4,'Steven Robinson', 'steven.r@example.com', '555-678-9012'),
(5, 5,'Betty Clark', 'betty.c@example.com', '555-789-0123'),
(4, 4,'Jeff Lewis', 'jeff.l@example.com', '555-890-1234'),
(2, 3,'Lisa Hall', 'lisa.h@example.com', '555-901-2345'),
(1, 2,'Brian Walker', 'brian.w@example.com', '555-012-3456'),
(3, 6,'Maria Perez', 'maria.p@example.com', '555-112-2334');

INSERT INTO orders (user_id, restaurant_id, total_amount, status) VALUES
(1, 1, 8.48, 'Completed'),
(2, 2, 21.49, 'Pending'),
(3, 3, 13.74, 'Preparing'),
(6, 2, 55.20, 'Completed'),
(2, 3, 32.99, 'Preparing'),
(7, 1, 18.00, 'Completed'),
(8, 3, 45.10, 'Pending'),
(3, 1, 7.50, 'Completed'),
(3, 2, 90.55, 'Preparing'),
(1, 1, 12.80, 'Completed'),
(5, 2, 67.45, 'Pending'),
(9, 3, 25.00, 'Completed'),
(2, 2, 38.60, 'Preparing'),
(2, 3, 10.99, 'Completed'),
(3, 1, 44.75, 'Pending');

INSERT INTO restaurant_ratings (restaurant_id, user_id, rating, reviews)
VALUES
(1, 1, 5, 'Amazing food and great ambiance!'),
(1, 2, 4, 'Good food but service was a bit slow.'),
(2, 1, 3, 'Average experience, nothing special.'),
(3, 3, 5, 'Loved it! Highly recommend the pasta.'),
(4, 3, 5, 'Loved it! Highly recommend the pasta.'),
(5, 3, 5, 'Loved it! Highly recommend the pasta.'),
(6, 3, 5, 'Loved it! Highly recommend the pasta.'),
(8, 3, 5, 'Loved it! Highly recommend the pasta.'),
(7, 2, 2, 'Too noisy and overpriced for what you get.');



-- User 1 adds items from multiple restaurants

-- Insert into basket
INSERT INTO basket (user_id, item_id, restaurant_id, quantity, price, note) VALUES
(1, 2, 1, 2, 12.50, 'Extra spicy'),
(1, 4, 1, 1, 9.00, NULL),
(2, 5, 2, 3, 7.99, 'No onions please'),
(3, 7, 3, 1, 15.00, 'Gluten-free option'),
(2, 6, 2, 2, 11.75, ''),
(3, 3, 1, 1, 8.25, 'Less oil'),
(1, 8, 1, 1, 6.50, 'Add cheese');



-- Assuming users with id 1 and 2 already exist

INSERT INTO delivery_options ( label)
VALUES
  ( 'Home'),
  ( 'Office'),
  ( 'Hostel Room 12'),
  ( 'Friend’s Place');


INSERT INTO payment_methods (label)
VALUES
  ('Google Pay'),
  ('Apple Pay'),
  ('PayPal'),
  ('Cash on Delivery'),
  ('Credit Card');


INSERT INTO discounts (code, description, percentage)
VALUES
  ('WELCOME10', '10% off on your first order', 10),
  ('FREESHIP', 'Free shipping on orders over $25', 100),
  ('LUNCH15', '15% off lunch orders between 12-3 PM', 15),
  ('SAVE5', 'Flat 5% off', 5);


INSERT INTO delivery_addresses (
  user_id, label, street, city, state, postal_code, country, full_address, is_default
) VALUES
-- Salman
(1, 'Home', '123 Main Street', 'Karachi', 'Sindh', '74000', 'Pakistan', '123 Main Street, Karachi, Sindh, 74000', TRUE),
(1, 'Work', '45 Business Road', 'Karachi', 'Sindh', '74010', 'Pakistan', '45 Business Road, Karachi, Sindh, 74010', FALSE),

-- Essa
(2, 'Home', '67 Sunset Avenue', 'Lahore', 'Punjab', '54000', 'Pakistan', '67 Sunset Avenue, Lahore, Punjab, 54000', TRUE),
(2, 'Parents', '88 Garden Street', 'Lahore', 'Punjab', '54050', 'Pakistan', '88 Garden Street, Lahore, Punjab, 54050', FALSE),

-- Asemumer
(3, 'Home', '12 Model Town', 'Islamabad', 'ICT', '44000', 'Pakistan', '12 Model Town, Islamabad, ICT, 44000', TRUE),

-- Asemumer (second account)
(4, 'Home', '15 Green Street', 'Peshawar', 'KPK', '25000', 'Pakistan', '15 Green Street, Peshawar, KPK, 25000', TRUE);


INSERT INTO order_items ( order_id, item_id, quantity, note)
VALUES 
(1, 1, 1, 'Extra cheese'),   -- Margherita Pizza
(1, 2, 1, 'No mayo');        -- Veggie Burger

-- Sample seed data for orders table

