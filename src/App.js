import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Repayment from './pages/Repayment';
import Navbar from './pages/Navbar';
import UserView from './pages/UserView';
import UserService from './components/service/Userservice';
import FooterComponent from './layout/Footer';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/login" && location.pathname !== "/" && <Navbar />}
      <div className="content">
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/profile1" element={<Home />} />
          <Route path="/homepage" element={<Home />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/registerCustomer" element={<Repayment />} />

          {/* Check if user is authenticated and admin before rendering admin-only routes */}
          {/* {UserService.isAdmin() && (
            <Route path="/registerCustomer" element={<Repayment />} />
          )} */}

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      <FooterComponent />
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
