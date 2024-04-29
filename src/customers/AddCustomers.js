import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const onSubmit = async (e) => {
    e.preventDefault();
    // Display confirmation prompt before submitting
    const shouldSubmit = window.confirm("Are you sure you want to submit?");
    if (shouldSubmit) {
      // Submit the form
     // await axios.post("http://localhost:9092/api/v1/customers", user);
      await axios.post("https://sc-mfi.onrender.com/api/v1/customers", user);
      navigate("/");
    }
  };
  console.log(onSubmit);
  return (
    <div className="container-fluid p-0">
      <div className="row m-0">
        <div className="col-12 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Joinner Customer</h2>

          <form onSubmit={(e) => onSubmit(e)}>
  <div className="mb-3">
    <label htmlFor="customerId" className="form-label">
      Customer Id
    </label>
    <input
      type="number"
      className="form-control"
      placeholder="Enter Customer Id"
      name="customerId"
      value={customerId}
      onChange={(e) => onInputChange(e)}
    />
  </div>
           {/* firstName */}
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                First Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* lastName */}
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Last Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter First Name"
                name="lastName"
                value={lastName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* phoneNumber1 */}
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                PhoneNumer 
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter First Name"
                name="phoneNumbers1"
                value={phoneNumbers1}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* phoneNumber2 */}
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                PhoneNumer 2
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter First Name"
                name="phoneNumbers2"
                value={phoneNumbers2}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* Amount */}
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Amount
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter First Name"
                name="amount"
                value={amount}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* status */}
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Status
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter First Name"
                name="status"
                value={status}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* first name in kh */}
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Fist name in kh
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter First Name"
                name="firstNameInKhmer"
                value={firstNameInKhmer}
                onChange={(e) => onInputChange(e)}
              />
            </div>
             {/* last name in kh */}
             <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Last name in kh
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter First Name"
                name="lastNameInKhmer"
                value={lastNameInKhmer}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* Marital Status */}
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Last name in kh
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter First Name"
                name="maritalStatus"
                value={maritalStatus}
                onChange={(e) => onInputChange(e)}
              />
            </div>
             {/* Employee Type */}
             <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Employee Type
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter First Name"
                name="employeeType"
                value={employeeType}
                onChange={(e) => onInputChange(e)}
              />
            </div>
             {/* Employee Type */}
             {/* <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Gender
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter First Name"
                name="gender"
                value={gender}
                onChange={(e) => onInputChange(e)}
              />
            </div> */}
             <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
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
             {/* Resident */}
             {/* <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Resident
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter First Name"
                name="resident"
                value={resident}
                onChange={(e) => onInputChange(e)}
              />
            </div> */}
                         <div className="mb-3">
          <label htmlFor="gender" className="form-label">
          Resident
          </label>
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
            {/* Identification */}
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Ident 
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter First Name"
                name="identityNo"
                value={identityNo}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div style={{marginLeft:'40%', marginTop: '60px'}}> 
      <h3>Resident</h3> 
      <Autocomplete 
        options={options} 
        style={{ width: 300 }} 
        renderInput={(params) => 
          <TextField {...params} label="Combo box" variant="outlined" />} 
      /> 
    </div>  */}
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
      </div>
    </div>
  </div>
  );
}
