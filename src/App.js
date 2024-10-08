import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from './components/auth/LoginPage';
import Home from './components/customers/CustomerList';
import Repayment from './components/customers/RegisterCustomer';
import Navbar from './components/layout/Navbar';
import UserView from './components/customers/ViewCustomers';
import RegisterJoinerCustomer from './components/customers/RegisterJoinerCustomers';
import AuthService from './components/service/Userservice'; // Example auth service
import AddCustomer from './components/customers/AddCustomers';
import Page1 from './components/admins/Page1';
import DynamicForm from './components/customers/Dynamicform';
import Schedule from './components/Loan/Shedule';
import LoanStatusChecker from './components/Loan/LoanChecker';
import LoanRepaymentForm from './components/Loan/LoanRepaymentForm';
import RegisterCustomerForm from './components/customers/RegisterCustomerForm';
import LoanList from './components/Loan/LoanList';
import RegisterNewLoan from './components/Loan/RegisterNewLoan';
import Dashboard from './components/Loan/Dashboard';
import LoanScheduleGenerator from './components/customers/LoanScheduleGenerator ';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/login" && location.pathname !== "/" && location.pathname !== "/dashboard" && <Navbar />}
      <div className="content">
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile1" element={<Home />} />
          <Route path="/homepage" element={<Home />} />
          <Route path="/checker" element={<LoanStatusChecker />} />
          <Route path="/homepage11" element={<Schedule />} />
          <Route exact path="/dynamic" element={<DynamicForm />} />
          {/* <Route path="/viewHello" element={<LoanScheduleGenerator />} /> */}
          <Route path="/payment" element={<LoanRepaymentForm />} />
          <Route path="/payment1" element={<RegisterCustomerForm />} />
          <Route path="/newLoan" element={<RegisterNewLoan />} />
          <Route path="/listloan" element={<LoanList />} />
          <Route path="/shedule" element={<LoanScheduleGenerator />} />
          <Route path="/users/:id" element={<UserView />} />
          
          {/* Routes for admin users */}
          {AuthService.isAuthenticated() && AuthService.isAdmin() && (
            <>
              <Route path="/adduser" element={<AddCustomer />} />
              <Route path="/registerCustomer" element={<Repayment />} />
              <Route path="/admin" element={<PrivateRoute element={<Page1 />} />} />
            </>
          )}
          
          {/* Routes for regular users */}
          {AuthService.isAuthenticated() && AuthService.isUser() && (
            <>
              <Route path="/customerlist" element={<Home />} />
              <Route path="/registerCustomer" element={<Repayment />} />
              <Route path="/addJoiner" element={<PrivateRoute element={<RegisterJoinerCustomer />} />} />
            </>
          )}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      {/* <FooterComponent /> */}
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
