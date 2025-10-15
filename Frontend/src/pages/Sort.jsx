import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // 💡 Import useSearchParams
import Search from '../components/Search.jsx';
import Cars from '../components/Cars.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Chatbot from '../components/Chatbot.jsx';

const Sort = ({ cars }) => {
  const [filteredCars, setFilteredCars] = useState(cars);
  const [searchParams] = useSearchParams(); // 💡 Get search params from URL

  // ✅ Use useEffect to filter cars whenever the URL or the main car list changes
  useEffect(() => {
    const country = searchParams.get('country') || '';
    const brand = searchParams.get('brand') || '';
    const priceRange = searchParams.get('priceRange') || '';

    let filtered = cars;

    if (country) {
      filtered = filtered.filter((car) => car.country === country);
    }

    if (brand) {
      filtered = filtered.filter((car) => car.brand === brand);
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter((car) => {
        const carPrice = Number(String(car.price).replace(/,/g, ''));
        return max ? carPrice >= min && carPrice <= max : carPrice >= min;
      });
    }

    setFilteredCars(filtered);
  }, [searchParams, cars]); // Dependency array ensures this runs when params change

  return (
    <div style={{ backgroundImage: "https://res.cloudinary.com/dqxtox5rl/image/upload/v1760378571/bgimg3_wyzhyf.jpg", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <Navbar />
      {/* The Search component here will now correctly navigate to apply new filters */}
      <Search /> 
      <Cars cars={filteredCars} />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Sort;
