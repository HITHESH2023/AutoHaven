require('dotenv').config();

const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const insertAdmin = async () => {
  const username = 'admin';
  const email = 'admin@gmail.com';
  const password = 'admin';

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO public.admins (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );

    console.log('✅ Admin added successfully to your Neon database!');
  } catch (error) {
    console.error('Error inserting admin:', error.detail || error.message);
  } finally {
    pool.end();
  }
};

insertAdmin();