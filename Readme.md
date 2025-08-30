# AI-Driven Marketplace for Vehicles 🚗🤖

An **AI-Driven Marketplace for Vehicles** that leverages advanced AI technology to provide personalized vehicle recommendations, facilitate test ride bookings, and streamline the buying and selling process for luxury cars and bikes. This platform is designed to enhance user experience and efficiency for both buyers and sellers.

---

## Features 🌟

### For Buyers:
- **Personalized Recommendations**:
  - AI suggests vehicles based on user preferences and search history.
- **Test Ride Booking**:
  - Schedule test rides for luxury vehicles with ease.
- **Advanced Search Filters**:
  - Filter vehicles by brand, model, price, features, and more.

### For Sellers:
- **Seamless Listings**:
  - Create and manage vehicle listings effortlessly.
- **Performance Insights**:
  - Analytics on listing views, inquiries, and sales.

### For Admins:
- **Inventory Management**:
  - Oversee vehicle listings and test ride availability.
- **User Management**:
  - Manage buyers and sellers on the platform.
- **AI Training Data**:
  - Update and refine AI recommendation algorithms.

---

## Tech Stack 🛠️

### Frontend:
- **React.js**: For a dynamic and responsive user interface.
- **HTML5**, **CSS3**, **JavaScript**: Core web technologies.
- **TailwindCSS**: For modern and efficient styling.

### Backend:
- **Node.js**: For server-side logic.
- **Express.js**: To handle API requests and routing.
- **PostgreSQL**: As the relational database for storing user, vehicle, and transaction data.
- **MongoDB**: For storing AI training data and logs.

### AI Integration:
- **Recommendation System/Chatbot**:
  - Built using BotPress.
  - Trained on user preferences and vehicle data.
- **Natural Language Processing (NLP)**:
  - For understanding user queries and providing accurate search results.

---

## Installation & Setup 🚀

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ai-vehicle-marketplace.git
   cd ai-vehicle-marketplace
   ```

2. **Install dependencies**:
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Setup the database**:
   - Ensure PostgreSQL and MongoDB are installed and running.
   - Create the necessary databases and run the provided scripts in `database/schema.sql` and `database/seed.js`.

4. **Environment variables**:
   - Create a `.env` file in the backend folder and add the following:
     ```
     PORT=5000
     DATABASE_URL=your_postgresql_connection_string
     MONGO_URI=your_mongodb_connection_string
     AI_API_KEY=your_ai_api_key
     ```

5. **Run the project**:
   - Backend:
     ```bash
     cd Backend
     node index.js
     ```
   - Frontend:
     ```bash
     cd Frontend
     yarn run dev
     ```

---

## Usage 💻

1. **For Buyers**:
   - Register and log in to explore vehicles.
   - Use the search and filter options to find your ideal vehicle.
   - Book test rides directly through the platform.

2. **For Admins**:
   - Log in to manage users, vehicles, and test rides.
   - Refine AI recommendations by updating training data.

---

## Database Schema 📊

### Tables:
1. **Users**:
   - `id` (Primary Key)
   - `first_name`
   - `last_name`
   - `email`
   - `password`
   - `role` (buyer/seller/admin)

2. **Vehicles**:
   - `id` (Primary Key)
   - `seller_id` (Foreign Key)
   - `brand`
   - `model`
   - `price`
   - `features`
   - `availability`

3. **Test Rides**:
   - `id` (Primary Key)
   - `vehicle_id` (Foreign Key)
   - `user_id` (Foreign Key)
   - `ride_date`

4. **AI Logs** (MongoDB):
   - `id` (Primary Key)
   - `user_query`
   - `recommendations`
   - `timestamp`

---

## Future Enhancements 🌟
- Currently the website only has cars, in future other category vehicles can also be added.
- Integration with payment gateways for secure transactions.
- Real-time chat between buyers and sellers.
- AI-powered price suggestions for sellers.
- Augmented Reality (AR) view for vehicles.

---

## Contributing 🤝
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

---

## License 📜
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements 🙏
- [PostgreSQL](https://www.postgresql.org/) and [MongoDB](https://www.mongodb.com/) for database management.
- [React.js](https://reactjs.org/) for building the frontend.
- [Botpress](https://botpress.com) for chatbot development

---

## Contact 📨
For any queries or suggestions, feel free to contact:
- **Your Name**: [cghithesh7@gmail.com](mailto:cghithesh7@gmail.com)
- [GitHub Profile](https://github.com/HITHESH2023)

---

Thank you for exploring the AI-Driven Marketplace for Vehicles! 🚗✨
