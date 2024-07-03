import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../service/Userservice";

export default function AddCustomer() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    customerId: "",
    firstName: "",
    lastName: "",
    phoneNumbers1: "",
    phoneNumbers2: "",
    amount: "",
    status: "",
    firstNameInKhmer: "",
    lastNameInKhmer: "",
    maritalStatus: "",
    employeeType: "",
    customerURLImage:"",
    gender: "",
    resident: "",
    identityNo: ""
  });

  const {
    customerId,
    firstName,
    lastName,
    phoneNumbers1,
    phoneNumbers2,
    amount,
    status,
    firstNameInKhmer,
    lastNameInKhmer,
    maritalStatus,
    employeeType,
    customerURLImage,
    gender,
    resident,
    identityNo
  } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onGenderChange = (e) => {
    setUser({ ...user, gender: e.target.value });
  };

  const onResidentChange = (e) => {
    setUser({ ...user, resident: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Display confirmation prompt before submitting
      const shouldSubmit = window.confirm("Are you sure you want to submit?");
      if (shouldSubmit) {
        const token = localStorage.getItem('token');
        await UserService.register(user, token);
        alert('User registered successfully');
        navigate('/homepage');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred while registering user');
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row m-0">
        <div className="col-12 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Joinner Customer</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="customerId" className="form-label">Customer Id</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Customer Id"
                name="customerId"
                value={customerId}
                onChange={onInputChange}
              />
            </div>
            {/* firstName */}
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter First Name"
                name="firstName"
                value={firstName}
                onChange={onInputChange}
              />
            </div>
            {/* lastName */}
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                name="lastName"
                value={lastName}
                onChange={onInputChange}
              />
            </div>
            {/* phoneNumbers1 */}
            <div className="mb-3">
              <label htmlFor="phoneNumbers1" className="form-label">Phone Number 1</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Phone Number"
                name="phoneNumbers1"
                value={phoneNumbers1}
                onChange={onInputChange}
              />
            </div>
            {/* phoneNumbers2 */}
            <div className="mb-3">
              <label htmlFor="phoneNumbers2" className="form-label">Phone Number 2</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Phone Number"
                name="phoneNumbers2"
                value={phoneNumbers2}
                onChange={onInputChange}
              />
            </div>
            {/* amount */}
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Amount"
                name="amount"
                value={amount}
                onChange={onInputChange}
              />
            </div>
            {/* status */}
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Status"
                name="status"
                value={status}
                onChange={onInputChange}
              />
            </div>
            {/* firstNameInKhmer */}
            <div className="mb-3">
              <label htmlFor="firstNameInKhmer" className="form-label">First Name in Khmer</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter First Name in Khmer"
                name="firstNameInKhmer"
                value={firstNameInKhmer}
                onChange={onInputChange}
              />
            </div>
            {/* lastNameInKhmer */}
            <div className="mb-3">
              <label htmlFor="lastNameInKhmer" className="form-label">Last Name in Khmer</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name in Khmer"
                name="lastNameInKhmer"
                value={lastNameInKhmer}
                onChange={onInputChange}
              />
            </div>
            {/* maritalStatus */}
            <div className="mb-3">
              <label htmlFor="maritalStatus" className="form-label">Marital Status</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Marital Status"
                name="maritalStatus"
                value={maritalStatus}
                onChange={onInputChange}
              />
            </div>
            {/* employeeType */}
            <div className="mb-3">
              <label htmlFor="employeeType" className="form-label">Employee Type</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Employee Type"
                name="employeeType"
                value={employeeType}
                onChange={onInputChange}
              />
            </div>
            {/* gender */}
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select
                className="form-control"
                name="gender"
                value={gender}
                onChange={onGenderChange}
              >
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            {/* resident */}
            <div className="mb-3">
              <label htmlFor="resident" className="form-label">Resident</label>
              <select
                className="form-control"
                name="resident"
                value={resident}
                onChange={onResidentChange}
              >
                <option value="">-- Select Resident --</option>
                <option value="RESIDENT">RESIDENT</option>
                <option value="NON_RESIDENT">NON_RESIDENT</option>
              </select>
            </div>
            {/* identityNo */}
            <div className="mb-3">
              <label htmlFor="identityNo" className="form-label">Identity No</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Identity No"
                name="identityNo"
                value={identityNo}
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">Submit</button>
            <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
