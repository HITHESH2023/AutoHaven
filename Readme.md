# AutoHaven: AI-Powered Car Buying Assistant

AutoHaven is a web application designed to simplify the car buying process. It features an AI-powered chatbot that provides users with comprehensive, unbiased information about various car models, helping them make informed decisions without the pressure of a traditional sales environment.

## 🌟 Features

### For Users:

  * **AI Chatbot**: An intelligent assistant trained on a comprehensive dataset of cars to answer questions about technical specifications, features, pros and cons, and pricing.
  * **Browse and Search Cars**: Users can browse a gallery of cars and search for specific models.
  * **Detailed Car Information**: View detailed pages for each car with all the relevant information.
  * **User Authentication**: Secure user registration and login functionality.
  * **Test Drive Booking**: Users can book a test drive for their chosen car.
  * **Contact Form**: A simple way for users to send messages and inquiries.

### For Admins:

  * **Admin Dashboard**: A dedicated page for admins to manage the application's data.
  * **User Management**: View and delete registered users.
  * **Manage Test Drives**: View and delete test drive bookings.
  * **Manage Contacts**: View and delete messages from the contact form.

## 💻 Tech Stack

### Frontend

  * **React**: A JavaScript library for building user interfaces.
  * **React Router**: For declarative routing in the React application.
  * **Botpress**: For integrating the AI-powered chatbot.

### Backend

  * **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
  * **Express**: A fast, unopinionated, minimalist web framework for Node.js.
  * **PostgreSQL**: A powerful, open-source object-relational database system.
  * **bcryptjs**: For hashing passwords.
  * **jsonwebtoken**: For generating and verifying JSON Web Tokens.
  * **cors**: For enabling Cross-Origin Resource Sharing.
  * **dotenv**: For loading environment variables from a `.env` file.

## 🚀 Getting Started

### Prerequisites

  * Node.js and npm (or yarn)
  * PostgreSQL

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/autohaven.git
    ```

2.  **Backend Setup:**

      * Navigate to the `Backend` directory:
        ```bash
        cd Backend
        ```
      * Install the dependencies:
        ```bash
        npm install
        ```
      * Create a `.env` file in the `Backend` directory and add the following environment variables:
        ```env
        DATABASE_URL="your-postgresql-database-url"
        JWT_SECRET="your-jwt-secret"
        ```
      * Start the backend server:
        ```bash
        npm start
        ```

3.  **Frontend Setup:**

      * Navigate to the `Frontend` directory:
        ```bash
        cd Frontend
        ```
      * Install the dependencies:
        ```bash
        npm install
        ```
      * Start the frontend development server:
        ```bash
        npm run dev
        ```

## 📋 API Endpoints

### User Routes

  * `POST /api/register`: Register a new user.
  * `POST /api/login`: Log in a user.
  * `GET /api/cars`: Get a list of all cars.
  * `POST /api/test-ride`: Book a test ride.
  * `POST /api/contact`: Submit a message through the contact form.

### Admin Routes

  * `POST /api/adminLogin`: Log in as an administrator.
  * `GET /api/admin/users`: Get a list of all users.
  * `GET /api/admin/test-rides`: Get a list of all test rides.
  * `GET /api/admin/contacts`: Get a list of all contact messages.
  * `DELETE /api/admin/users/:id`: Delete a user.
  * `DELETE /api/admin/test-rides/:id`: Delete a test ride.
  * `DELETE /api/admin/contacts/:id`: Delete a contact message.

## 🗃️ Database Schema

Here is the basic schema for the PostgreSQL database:

```sql
-- Cars Table
CREATE TABLE public.cars (
    id SERIAL PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    price VARCHAR(255),
    category VARCHAR(255),
    brand VARCHAR(255),
    -- ... other car details
);

-- Users Table
CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Logins Table
CREATE TABLE public.logins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES public.users(id) ON DELETE CASCADE
);

-- Test Rides Table
CREATE TABLE public.test_rides (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER,
    license_no VARCHAR(255),
    ride_date DATE,
    car VARCHAR(255)
);

-- Contacts Table
CREATE TABLE public.contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT
);

-- Admins Table
CREATE TABLE public.admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

## 📂 Project Structure

```
AutoHaven/
├── Backend/
│   ├── node_modules/
│   ├── index.js
│   ├── package.json
│   └── ...
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md
```

## 🤝 Contributing

Contributions are welcome\! Please feel free to submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See `LICENSE` for more information.
