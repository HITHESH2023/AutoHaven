// 💡 Add this to read the .env file
require('dotenv').config();

const bcrypt = require('bcrypt');
const { Pool } = require('pg');

// 💡 Change this Pool configuration
const pool = new Pool({
  // It now reads the connection string from your .env file
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const insertAdmin = async () => {
  // These are the details for your admin user
  const username = 'admin';
  const email = 'admin@gmail.com';
  const password = 'admin';

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert admin details into the database
    await pool.query(
      'INSERT INTO public.admins (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );

    console.log('✅ Admin added successfully to your Neon database!');
  } catch (error) {
    // This will catch errors like "admin already exists"
    console.error('Error inserting admin:', error.detail || error.message);
  } finally {
    pool.end(); // Close the database connection
  }
};

// Run the function
insertAdmin();