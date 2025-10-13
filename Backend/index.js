const express = require('express');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// This endpoint will serve the car data from your database.
app.get('/api/cars', async (req, res) => {
  try {
    const allCars = await pool.query('SELECT * FROM public.cars ORDER BY id');
    res.json(allCars.rows);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Register Route
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the email is already registered
    const emailCheck = await pool.query('SELECT * FROM public.users WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Insert user details
    const newUser = await pool.query(
      'INSERT INTO public.users (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *',
      [firstName, lastName, email]
    );

    const userId = newUser.rows[0].id;
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO public.logins (username, email, password, user_id) VALUES ($1, $2, $3, $4)',
      [email, email, hashedPassword, userId]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {

  const { email, password } = req.body;

  try {
    // ✅ Fetch user by email only and join to get name
    const result = await pool.query(
      `SELECT l.id, l.email, l.password, u.first_name, u.last_name 
       FROM public.logins l
       JOIN public.users u ON l.user_id = u.id
       WHERE l.email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const loginData = result.rows[0];
    const validPassword = await bcrypt.compare(password, loginData.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: loginData.id }, JWT_SECRET, { expiresIn: '1h' });

    // ✅ Return user details without username
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: loginData.id,
        email: loginData.email,
        firstName: loginData.first_name, // Send first name for display
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Test Ride Route
app.post('/api/test-ride', async (req, res) => {
  const { name, age, licenseNo, date, car } = req.body;

  try {
    await pool.query(
      'INSERT INTO public.test_rides (name, age, license_no, ride_date, car) VALUES ($1, $2, $3, $4, $5)',
      [name, age, licenseNo, date, car]
    );
    res.status(201).json({ message: 'Test ride booked successfully!' });
  } catch (error) {
    console.error('Error saving test ride data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Contact Route
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Insert contact form data into the database
    await pool.query(
      'INSERT INTO public.contacts (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );

    res.status(201).json({ message: 'Message received successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Admin Login Route
app.post('/api/adminLogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await pool.query('SELECT * FROM public.admins WHERE email = $1', [email]);
    if (admin.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, admin.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin.rows[0].id,
        username: admin.rows[0].username,
        email: admin.rows[0].email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all users
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM public.users');
    res.json(users.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all test rides
app.get('/api/admin/test-rides', async (req, res) => {
  try {
    const testRides = await pool.query('SELECT * FROM public.test_rides');
    res.json(testRides.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all contacts
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const contacts = await pool.query('SELECT * FROM public.contacts');
    res.json(contacts.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete User
app.delete('/api/admin/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Delete user and associated login
    await pool.query('DELETE FROM public.logins WHERE user_id = $1', [id]);
    await pool.query('DELETE FROM public.users WHERE id = $1', [id]);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete Test Ride
app.delete('/api/admin/test-rides/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM public.test_rides WHERE id = $1', [id]);
    res.json({ message: 'Test ride deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete Contacts
app.delete('/api/admin/contacts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM public.contacts WHERE id = $1', [id]);
    res.json({ message: 'Test ride deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
