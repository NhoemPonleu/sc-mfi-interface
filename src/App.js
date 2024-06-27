import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage';
// import AddCustomer from './customers/AddCustomers';
// import UserView from './customers/UserView';
// import Repayment from './customers/Repayment';
// import Joiner from './customers/Joinner';
import UserService from './components/service/Userservice';
import FooterComponent from './layout/Footer';
import Home from './pages/Home';
import Repayment from './pages/Repayment';
import Navbar from './pages/Navbar';

function App() {
  return (
  //   <div className="App">
  //     <Router>
  //       <Navbar />
  //       <Routes>
  //         <Route path="/" element={<LoginPage />} />
  //         <Route path="/homepage" element={<Home />} />
  //         <Route path="/adduser" element={<AddCustomer />} />
  //         <Route path="/addJoiner" element={<Joiner />} />
  //         <Route path="/repayment" element={<Repayment />} />
  //         <Route path="/users/:id" element={<UserView />} />
  //       </Routes>
  //     </Router>
  //   </div>
  // );
  <BrowserRouter>
      <div className="App">
        {/* <Navbar /> */}
        <div className="content">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            <Route path="/profile1" element={<Navbar />} />
            <Route path="/homepage" element={<Home />} />

            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {UserService.adminOnly() && (
              <>
                {/* <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} /> */}
              </>
            )}
            {/* <Route path="*" element={<Navigate to="/login" />} />‰ */}
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;