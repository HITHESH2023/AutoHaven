import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Contact from "./pages/Contact.jsx";
import Help from "./pages/Help.jsx";
import Sort from "./pages/Sort.jsx";
import CarsPage from "./pages/CarsPage.jsx";
import TestRideForm from "./pages/TestRideForm.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminPage from "./pages/AdminPage.jsx";

function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cars');
        const data = await response.json();

        // Convert the numeric price from DB back to a formatted string for display
        const formattedData = data.map(car => ({
          ...car,
          price: Number(car.price).toLocaleString('en-IN')
        }));

        setCars(formattedData);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []); // Empty array ensures this runs only once when the app loads.

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '2rem' }}>
        Loading Cars... 🚗
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home cars={cars}/>} />
          <Route path="/home" element={<Home cars={cars}/>} />
          <Route path="/cars" element={<CarsPage cars={cars}/>} />
          <Route path="/details/:carId" element={<Details cars={cars}/>} />
          <Route path="/sort" element={<Sort cars={cars}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/testRideForm" element={<TestRideForm />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
