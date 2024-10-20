import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
// Import your background image
import BackgroundImage from '../wp12516748-bus-4k-wallpapers.jpg'; // Adjust the path as necessary

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return alert('All fields are required.');
    }

    try {
      const url = isAdmin 
        ? "http://localhost:4000/admin-login" 
        : "http://localhost:4000/login"; 

      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      const { success, message, token, email, name, isAdmin: adminStatus, error } = result;

      if (success || adminStatus) {
        alert(message);
        localStorage.setItem('token', token);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
        localStorage.setItem('isAdmin', adminStatus || false);

        setTimeout(() => {
          navigate(adminStatus ? '/admin-home' : '/home');
        }, 1000);
      } else if (error) {
        alert(error || 'Login failed');
      }
    } catch (err) {
      alert('Login failed: ' + err);
    }
  };

  return (
    <div
      className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Login form with transparent background */}
      <div className="relative z-10 p-6 rounded-lg shadow-lg bg-white bg-opacity-70 max-w-lg w-full">
        <h1 className="text-black text-2xl text-center font-bold mb-4">Welcome to NXTBooking</h1>
        <h2 className="text-red-600 text-xl font-bold mb-4">Login</h2>

        {/* Radio buttons to choose between User and Admin Login */}
        <div className="mb-4 flex justify-center">
          <label className="mr-4 flex items-center">
            <input
              type="radio"
              name="loginType"
              checked={!isAdmin}
              onChange={() => setIsAdmin(false)}
              className="mr-1"
            />
            User Login
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="loginType"
              checked={isAdmin}
              onChange={() => setIsAdmin(true)}
              className="mr-1"
            />
            Admin Login
          </label>
        </div>

        {/* Input fields for login */}
        <div className="flex flex-col items-center">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginInfo.email}
            onChange={handleChange}
            className="w-full max-w-xs p-3 mb-4 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginInfo.password}
            onChange={handleChange}
            className="w-full max-w-xs p-3 mb-4 border border-gray-300 rounded-lg"
          />
          <button 
            className="w-full max-w-xs p-3 bg-red-600 text-white font-bold rounded-lg"
            onClick={handleSubmit}
          >
            Login <LoginIcon />
          </button>
        </div>

        <p className="mt-4 text-black text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-red-600 font-bold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};  

export default Login;
