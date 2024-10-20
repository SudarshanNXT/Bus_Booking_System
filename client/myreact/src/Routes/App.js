import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "../Components/Auth/Login/Login.js";
import Register from "../Components/Auth/Register/Register.js";
import HomeSearchBus from "../Components/Common/HomeSearchBus/HomeSearchBus.js"; 
import BusList from "../Components/Bus/BusList/BusList.js"; 
import SelectSeat from "../Components/Bus/SelectSeat/SelectSeat.js";
import PassengerForm from "../Components/Booking/PassengerForm/PassengerForm.js";
import PaymentConfirmation from "../Components/Booking/PaymentConfirmation/PaymentConfirmation.js";
import PaymentPage from "../Components/Payments/PaymentPage.js";
import Ticket from "../Pages/Ticket.js";
import Profile from "../Pages/Account/Profile.js";
import ShowTicket from "../Pages/ShowTicket.js";
import AdminHome from "../Components/Auth/AdminLogin/AdminHome.js";
import PrivateRoute from "./PrivateRoute.js";
import AdminPrivateRoute from "./AdminPrivateRoute.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/home" element={<PrivateRoute><HomeSearchBus /></PrivateRoute>} />
        <Route path="/buses" element={<PrivateRoute><BusList /></PrivateRoute>} />
        <Route path="/seat-selection" element={<PrivateRoute><SelectSeat /></PrivateRoute>} />
        <Route path="/passenger-form" element={<PrivateRoute><PassengerForm /></PrivateRoute>} />
        <Route path="/payment-confirmation" element={<PrivateRoute><PaymentConfirmation /></PrivateRoute>} />
        <Route path="/payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
        <Route path="/view-ticket/:bookingId" element={<PrivateRoute><Ticket /></PrivateRoute>} /> {/* Updated route */}
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/show-ticket" element={<PrivateRoute><ShowTicket /></PrivateRoute>} />
        
        {/* Admin routes */}
        <Route path="/admin-home" element={<AdminPrivateRoute><AdminHome /></AdminPrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
