import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import UserService from "../components/service/Userservice";

function Repayment() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
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
    identityNo: "",
    googleMap: "",
    customerURLImage:"",
    husbandPhone1: "",
    createAccount: false
  });

  const {
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
    identityNo,
    createAccount,
    googleMap,
    customerURLImage,
    husbandPhone1,
  } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const shouldSubmit = window.confirm("Are you sure you want to submit?");
    if (shouldSubmit) {
      try {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        await UserService.registerCustomer(user, token);
        navigate("/homePage"); // Redirect to homepage after successful submission
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle error appropriately, e.g., show error message to user
      }
    }
  };

  return (
    <div className='container' style={{ width: '60%' }}>
      <form onSubmit={onSubmit}>
        <MDBRow className='mb-4'>
          <MDBCol>
            <p className="text-muted">First Name</p>
            <MDBInput name="firstName"
              value={firstName}
              onChange={onInputChange}
              id='formFirstName'
              label='' placeholder="Enter first name" />
          </MDBCol>
          <MDBCol>
            <p className="text-muted">Last Name</p>
            <MDBInput name="lastName"
              value={lastName} onChange={onInputChange}
              id='formLastName' label=''
              placeholder="Enter last name" />
          </MDBCol>
        </MDBRow>

        <MDBRow className='mb-4'>
          <MDBCol>
            <p className="text-muted">Phone Numbers 1</p>
            <MDBInput name="phoneNumbers1"
              value={phoneNumbers1} onChange={onInputChange}
              id='formPhone1' label='' placeholder="Enter phone number 1" />
          </MDBCol>
          <MDBCol>
            <p className="text-muted">Phone Numbers 2</p>
            <MDBInput name="phoneNumbers2"
              value={phoneNumbers2} onChange={onInputChange}
              id='formPhone2' label='' placeholder="Enter phone number 2" />
          </MDBCol>
        </MDBRow>

        <MDBRow className='mb-4'>
          <MDBCol>
            <p className="text-muted">Input map url</p>
            <MDBInput name="googleMap"
              value={googleMap} onChange={onInputChange}
              id='formPhone1' label='' placeholder="map urls" />
          </MDBCol>
          <MDBCol>
            <p className="text-muted">Input customerimage url</p>
            <MDBInput name="customerURLImage"
              value={customerURLImage} onChange={onInputChange}
              id='formPhone1' label='' placeholder="customer drive urls" />
          </MDBCol>
          <MDBCol>
            <p className="text-muted">Family Phone Number</p>
            <MDBInput name="husbandPhone1"
              value={husbandPhone1}
              onChange={onInputChange}
              id='formPhone2' label='' placeholder="Enter family phone number" />
          </MDBCol>
        </MDBRow>

        <div className='mb-4'>
          <label htmlFor='formAmount'>Enter amount</label>
          <MDBInput
            name="amount"
            value={amount}
            onChange={onInputChange}
            id='formAmount'
            placeholder="Enter amount"
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='formStatus'>Enter status</label>
          <MDBInput
            name="status"
            value={status}
            onChange={onInputChange}
            id='formStatus'
            placeholder="Enter status"
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='formFirstNameKhmer'>Enter first name in Khmer</label>
          <MDBInput
            name="firstNameInKhmer"
            value={firstNameInKhmer}
            onChange={onInputChange}
            id='formFirstNameKhmer'
            placeholder="Enter first name in Khmer"
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='formLastNameKhmer'>Enter last name in Khmer</label>
          <MDBInput
            name="lastNameInKhmer"
            value={lastNameInKhmer}
            onChange={onInputChange}
            id='formLastNameKhmer'
            placeholder="Enter last name in Khmer"
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='formMaritalStatus'>Enter marital status</label>
          <MDBInput
            name="maritalStatus"
            value={maritalStatus}
            onChange={onInputChange}
            id='formMaritalStatus'
            placeholder="Enter marital status"
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='formEmployeeType'>Enter employee type</label>
          <MDBInput
            name="employeeType"
            value={employeeType}
            onChange={onInputChange}
            id='formEmployeeType'
            placeholder="Enter employee type"
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='formGender'>Enter gender</label>
          <MDBInput
            name="gender"
            value={gender}
            onChange={onInputChange}
            id='formGender'
            placeholder="Enter gender"
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='formResident'>Enter resident</label>
          <MDBInput
            name="resident"
            value={resident}
            onChange={onInputChange}
            id='formResident'
            placeholder="Enter resident"
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='formIdentityNo'>Enter identity number</label>
          <MDBInput
            name="identityNo"
            value={identityNo}
            onChange={onInputChange}
            id='formIdentityNo'
            placeholder="Enter identity number"
          />
        </div>

        <MDBCheckbox
          wrapperClass='d-flex justify-content-center mb-4'
          id='formCreateAccount'
          name="createAccount"
          checked={createAccount}
          onChange={() => setUser({ ...user, createAccount: !createAccount })}
          label='Create an account?'
        />

        <MDBBtn className='mb-4' type='submit' block>
          Register Customer
        </MDBBtn>
      </form>
    </div>
  );
}

export default Repayment;
