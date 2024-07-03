import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from './components/auth/LoginPage';
import Home from './components/customers/CustomerList';
import Repayment from './components/customers/RegisterCustomer';
import Navbar from './components/layout/Navbar';
import UserView from './components/customers/ViewCustomers';
import FooterComponent from './components/layout/Footer';
import RegisterJoinerCustomer from './components/customers/RegisterJoinerCustomers';
import AuthService from './components/service/Userservice'; // Example auth service
import AddCustomer from './components/customers/AddCustomers';
import Page1 from './components/admins/Page1';

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
          {AuthService.isAuthenticated() && AuthService.isAdmin() ? (
            <Route path="/adduser" element={<AddCustomer />} />
          ) : null}
          {AuthService.isAuthenticated() && AuthService.isAdmin() ? (
            <Route path="/registerCustomer" element={<Repayment />} />
          ) : null}
          {AuthService.isAuthenticated() && AuthService.isUser() ? (
            <Route path="/customerlist" element={<Home />} />
          ) : null}
          <Route path="/addJoiner" element={<PrivateRoute element={<RegisterJoinerCustomer />} />} />
          <Route path="/admin" element={<PrivateRoute element={<Page1 />} />} />
          {/* <Route path="/registerCustomer" element={<PrivateRoute element={<Repayment />} />} /> */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      <FooterComponent />
    </div>
  );
}

const PrivateRoute = ({ element }) => {
  return AuthService.isAuthenticated() ? element : <Navigate to="/login" />;
};

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
