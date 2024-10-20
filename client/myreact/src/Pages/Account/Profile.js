import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import "../../index.css";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Header from '../../Components/Common/Header/Header';
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [userName, setUserName] = useState('');
  const [formValues, setFormValues] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    // Get user information from localStorage on mount
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    
    if (userEmail) {
      setUserInfo(userEmail);
      setFormValues((prevValues) => ({ ...prevValues, email: userEmail }));
    }

    if (userName) {
      setUserName(userName);
      setFormValues((prevValues) => ({ ...prevValues, name: userName }));
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the updated user information to the backend
      const response = await axios.put('http://localhost:4000/profile-update', formValues, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Sending token for authorization
        },
      });
      console.log(response);

      if (response.data.success) {
        // Update the user information locally
        localStorage.setItem('userEmail', formValues.email);
        localStorage.setItem('userName', formValues.name);
        setUserInfo(formValues.email);
        setUserName(formValues.name);
        setIsEditing(false); // Exit editing mode
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
      
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg text-center">
        <div className="flex items-center justify-center mb-6">
          {/* User logo */}
          <PersonIcon style={{ fontSize: 80 }} className="text-red-600" />
        </div>

        {!isEditing ? (
          <>
            {/* Display name and email */}
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-black mb-2">{userName || 'Guest'}</h2>
              <p className="text-black">{userInfo || 'Guest'}</p>
            </div>

            {/* Edit button */}
            <div className="text-center">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Edit <EditIcon/>
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Name input */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-black mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Email input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-black mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Save button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Save <SaveAsIcon/>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
    </>
  );
};

export default Profile;
