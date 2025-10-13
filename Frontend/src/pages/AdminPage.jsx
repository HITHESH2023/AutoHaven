import React, { useState, useEffect } from "react";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [testRides, setTestRides] = useState([]);
  const [contacts, setContacts] = useState([]);  // Add state for contacts

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch("http://localhost:5000/api/admin/users");
        const testRidesResponse = await fetch("http://localhost:5000/api/admin/test-rides");
        const contactsResponse = await fetch("http://localhost:5000/api/admin/contacts");  // Fetch contacts
        setUsers(await usersResponse.json());
        setTestRides(await testRidesResponse.json());
        setContacts(await contactsResponse.json());  // Set contacts data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (type, id) => {
    const endpoint =
      type === "user"
        ? `http://localhost:5000/api/admin/users/${id}`
        : type === "test ride"
        ? `http://localhost:5000/api/admin/test-rides/${id}`
        : `http://localhost:5000/api/admin/contacts/${id}`;  // Handle contact deletion

    try {
      await fetch(endpoint, { method: "DELETE" });
      if (type === "user") {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } else if (type === "test ride") {
        setTestRides((prev) => prev.filter((ride) => ride.id !== id));
      } else {
        setContacts((prev) => prev.filter((contact) => contact.id !== id));  // Update contacts after deletion
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Admin Dashboard</h1>

      {/* Users Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Users</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">{user.first_name} {user.last_name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete("user", user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Test Rides Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Test Rides</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Age</th>
              <th className="border border-gray-300 px-4 py-2">License No</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Car Model</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testRides.map((ride) => (
              <tr key={ride.id} className="text-center hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{ride.id}</td>
                <td className="border border-gray-300 px-4 py-2">{ride.name}</td>
                <td className="border border-gray-300 px-4 py-2">{ride.age}</td>
                <td className="border border-gray-300 px-4 py-2">{ride.license_no}</td>
                <td className="border border-gray-300 px-4 py-2">{ride.ride_date}</td>
                <td className="border border-gray-300 px-4 py-2">{ride.car}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete("test ride", ride.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contacts Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Details</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Message</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="text-center hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{contact.id}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.name}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.message}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete("contact", contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
