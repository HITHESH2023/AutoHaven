import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TestRideForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    licenseNo: "",
    date: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate the date
    const selectedDate = new Date(formData.date);
    const today = new Date();
    if (selectedDate <= today) {
      alert("Please select a date after today.");
      return;
    }
  
    try {
      // Send data to the backend
      const response = await fetch("https://autohaven-ccoz.onrender.com/api/test-ride", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message); // "Test ride booked successfully!"
        navigate("/cars"); // Redirect to cars page
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to book test ride.");
      }
    } catch (error) {
      console.error("Error submitting test ride:", error);
      alert("An error occurred while booking the test ride.");
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-11/12 md:w-1/2">
        <h1 className="text-2xl font-bold mb-6">Book a Test Ride</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="18"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Driving License No</label>
            <input
              type="text"
              name="licenseNo"
              value={formData.licenseNo}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Select Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Car Model</label>
            <input
              type="text"
              name="car"
              value={formData.car}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestRideForm;
