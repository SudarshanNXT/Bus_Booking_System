import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HowToRegIcon from '@mui/icons-material/HowToReg';
// Import your background image
import BackgroundImage from '../wp12516748-bus-4k-wallpapers.jpg'; // Adjust the path as necessary

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  // Function to validate email format
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    return regex.test(email);
  };

  // Function to check password strength
  const checkPasswordStrength = (password) => {
    let strength = "Weak";
    if (password.length >= 8) {
      strength = "Medium"; // At least 8 characters
      if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
        strength = "Strong"; // Contains uppercase, number, and special character
      }
    }
    return strength;
  };

  const handleRegister = async () => {
    setErrorMessage(''); // Clear previous error messages

    if (!name || !email || !password) {
      showError('Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      showError('Invalid email format. Use a format like: anna@icloud.com');
      return;
    } 

    const strength = checkPasswordStrength(password);
    if (strength === "Weak") {
      showError('Password is too weak. Use at least 8 characters, including uppercase letters, numbers, and special characters.');
      return;
    }

    try {
      const result = await axios.post('http://localhost:4000/register', { name, email, password });
      console.log('Registration successful', result.data);
      navigate('/'); // Navigate to login after successful registration
    } catch (error) {
      console.log('Error during registration', error);
      showError('Registration failed, please try again');
    }
  };

  // Function to show error messages in a modal
  const showError = (message) => {
    setErrorMessage(message);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="relative flex flex-col justify-center items-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${BackgroundImage})`, // Set the background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Registration form with transparent background */}
      <div className="relative z-10 p-6 rounded-lg shadow-lg bg-white bg-opacity-70 max-w-md w-full">
        <h1 className="text-black text-2xl text-center font-bold mb-4">Create an Account</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordStrength(checkPasswordStrength(e.target.value));
          }}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
        />
        {password && (
          <p className={`mt-1 text-sm ${passwordStrength === 'Weak' ? 'text-red-600' : passwordStrength === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>
            Password strength: {passwordStrength}
          </p>
        )}
        <button 
          className="w-full p-3 bg-red-600 text-white font-bold rounded-lg transition duration-300 hover:bg-red-700 focus:outline-none"
          onClick={handleRegister}
        >
          Register <HowToRegIcon/>
        </button>
        <p className="mt-4 text-black text-center">
          Already have an account?{' '}
          <Link to="/" className="text-red-600 font-bold hover:text-red-700 transition duration-300">
            Login here
          </Link>
        </p>
      </div>

      {/* Modal for error messages */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md w-1/3">
            <h2 className="text-lg font-bold text-red-600">Error</h2>
            <p className="mt-2">{errorMessage}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
