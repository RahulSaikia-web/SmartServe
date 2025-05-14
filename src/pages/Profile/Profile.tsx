import React from 'react';
import Layout from '../../Layout/Layout';

const Profile: React.FC = () => {
  // Mock user data (replace with actual data fetching logic)
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA 12345',
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clear auth token, redirect to login)
    console.log('User logged out');
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-lg text-gray-900">{user.name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-lg text-gray-900">{user.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <p className="mt-1 text-lg text-gray-900">{user.phone}</p>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <p className="mt-1 text-lg text-gray-900">{user.address}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;