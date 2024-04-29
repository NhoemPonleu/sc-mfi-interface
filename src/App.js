import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import LoginPage from './pages/LoginPage';
import AddCustomer from './customers/AddCustomers';
import UserView from './customers/UserView';
import Repayment from './customers/Repayment';
import Joiner from './customers/Joinner';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/homepage" element={<Home />} />
          <Route path="/adduser" element={<AddCustomer />} />
          <Route path="/addJoiner" element={<Joiner />} />
          <Route path="/repayment" element={<Repayment />} />
          <Route path="/users/:id" element={<UserView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;