# Food Delivery App

An amazing full-stack food delivery application built with React Native (Expo) frontend and Node.js + Express backend, using PostgreSQL as the database.

---

## Features

- User basket management (add, update, remove items)
- Multi-step checkout flow (delivery options, payment method, discount, place order)
- Delivery address management (CRUD addresses)
- Restaurant and menu browsing
- Responsive mobile UI with React Native + Expo Router

---

## Tech Stack

- **Frontend:** React Native, Expo, Expo Router, Axios, TypeScript
- **Backend:** Node.js, Express.js, PostgreSQL
- **Database:** PostgreSQL
- **Other:** Axios for API calls

---

## Project Structure

```

/app                 # React Native app (frontend)
/functions           # Backend logic and database queries
/database            # Database connection and route definitions
/constants           # Constants like IP address

````

---

## Getting Started

### Prerequisites

- Node.js and npm/yarn installed
- PostgreSQL database setup
- Expo CLI installed globally: `npm install -g expo-cli`

### Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
````

2. Install backend dependencies:

   ```bash
   cd functions
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd ../Foodu
   npm install
   ```

4. Configure your PostgreSQL database connection in `/database/database.js`

5. Run database migrations or seed scripts to prepare tables

6. Start backend server:

   ```bash
   cd ../functions
   npm start
   ```

7. Run Expo frontend app:

   ```bash
   cd ../Foodu
   expo start
   ```

---

## API Endpoints

* `GET /basket?user_id=...` — Get basket items
* `POST /basket` — Add item to basket
* `PUT /basket/:item_id` — Update basket item
* `DELETE /basket/:item_id?user_id=...` — Remove basket item
* `GET /delivery-options/:userId` — Get user addresses
* `POST /delivery-options` — Add address
* `PUT /delivery-options/:id` — Update address
* `DELETE /delivery-options/:id` — Soft delete address

---

## Contributing

Feel free to fork the repo and submit pull requests. Please follow the code style and test your changes.



---

## Contact

Noor Hanan – [hanan@example.com](mailto:hanan@example.com)
Project Link: [GitHub Repository](repo-url)

```
```
