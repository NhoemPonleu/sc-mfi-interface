// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//   MDBRow,
//   MDBCol,
//   MDBInput,
//   MDBCheckbox,
//   MDBBtn
// } from 'mdb-react-ui-kit';

// const Joiner = () => {
//   const [formState, setFormState] = useState({
//     firstName: '',
//     lastName: '',
//     phoneNumber1: '',
//     phoneNumber2: '',
//     address: '',
//     customerId: 0,
//     registerDate: new Date().toISOString(),
//   });
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormState({ ...formState, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     try {
//       const response = await axios.post('https://sc-mfi.onrender.com/api/v1/joiner', formState);
//       console.log(response.data);
  
//       // Reset the form
//       setFormState({
//         firstName: '',
//         lastName: '',
//         phoneNumber1: '',
//         phoneNumber2: '',
//         address: '',
//         customerId: 0,
//         registerDate: new Date().toISOString(),
//       });
  
//       // Display success message
//       setSuccessMessage('Form submitted successfully!');
  
//       // Prompt user to confirm submission
//       const confirmSubmit = window.confirm('Are you sure you want to submit the form?');
//       if (confirmSubmit) {
//         // Perform additional actions or navigate to a different page
//       } else {
//         // Handle cancel
//         setSuccessMessage('');
//       }
//     } catch (error) {
//       console.error(error);
  
//       if (error.response && error.response.status === 404) {
//         // Handle customerId not found error
//         setSuccessMessage('');
//         const errorMessage = error.response.data.message;
//         // Display error message to the user
//         console.log(errorMessage);
//       } else {
//         // Handle other errors
//         // Display a generic error message or take appropriate action
//       }
//     }
//   };
//   return (
//     <div className="container-fluid p-0">
//       <div className="row m-0">
//         <div className="col-12 border rounded p-4 mt-2 shadow">
//           <h2 className="text-center m-4">Register Joinner Customer</h2>
//           <form onSubmit={handleSubmit}>
            // <div className="row mb-4">
            //   <div className="col">
            //     <div className="mb-3">
            //       <label htmlFor="firstName" className="form-label">
            //         First Name
            //       </label>
            //       <input
            //         type="text"
            //         className="form-control"
            //         id="firstName"
            //         placeholder="Enter First Name"
            //         name="firstName"
            //         value={formState.firstName}
            //         onChange={handleInputChange}
            //       />
            //     </div>
            //   </div>
            //   <div className="col">
            //     <div className="mb-3">
            //       <label htmlFor="lastName" className="form-label">
            //         Last Name
            //       </label>
            //       <input
            //         type="text"
            //         className="form-control"
            //         id="lastName"
            //         placeholder="Enter Last Name"
            //         name="lastName"
            //         value={formState.lastName}
            //         onChange={handleInputChange}
            //       />
            //     </div>
            //   </div>
            //   <div className="col">
            //     <div className="mb-3">
            //       <label htmlFor="phoneNumber1" className="form-label">
            //         Phone Number 1
            //       </label>
            //       <input
            //         type="text"
            //         className="form-control"
            //         id="phoneNumber1"
            //         placeholder="Enter Phone Number 1"
            //         name="phoneNumber1"
            //         value={formState.phoneNumber1}
            //         onChange={handleInputChange}
            //       />
            //     </div>
            //   </div>
            // </div>
            // <div className="row mb-4">
            //   <div className="col">
            //     <div className="mb-3">
            //       <label htmlFor="phoneNumber2" className="form-label">
            //         Phone Number 2
            //       </label>
            //       <input
            //         type="text"
            //         className="form-control"
            //         id="phoneNumber2"
            //         placeholder="Enter Phone Number 2"
            //         name="phoneNumber2"
            //         value={formState.phoneNumber2}
            //         onChange={handleInputChange}
            //       />
            //     </div>
            //   </div>
            //   <div className="col">
            //     <div className="mb-3">
            //       <label htmlFor="address" className="form-label">
            //         Address
            //       </label>
            //       <input
            //         type="text"
            //         className="form-control"
            //         id="address"
            //         placeholder="Enter Address"
            //         name="address"
            //         value={formState.address}
            //         onChange={handleInputChange}
            //       />
            //     </div>
            //   </div>
            //   <div className="col">
            //     <div className="mb-3">
            //       <label htmlFor="customerId" className="form-label">
            //         Customer Id
            //       </label>
            //       <input
            //         type="text"
            //         className="form-control"
            //         id="customerId"
            //         placeholder="Enter Customer Id"
            //         name="customerId"
            //        value={formState.customerId}
            //         onChange={handleInputChange}
            //       />
            //     </div>
            //   </div>
            // </div>
//             {/* Rest of the form code */}
//             <div className="text-center">
//               <MDBBtn type="submit">Submit</MDBBtn>
//             </div>
//           </form>
//           {successMessage && (
//             <div className="text-center mt-4">
//               <p>{successMessage}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Joiner;


import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';

const RegisterJoinerCustomer = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    phoneNumber1: '',
    phoneNumber2: '',
    address: '',
    customerId: 0,
    registerDate: new Date().toISOString(),
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://sc-mfi.onrender.com/api/v1/joiner', formState);
      console.log(response.data);

      // Reset the form
      setFormState({
        firstName: '',
        lastName: '',
        phoneNumber1: '',
        phoneNumber2: '',
        address: '',
        customerId: 0,
        registerDate: new Date().toISOString(),
      });

      // Display success message
      setSuccessMessage('Form submitted successfully!');

      // Prompt user to confirm submission
      const confirmSubmit = window.confirm('Are you sure you want to submit the form?');
      if (confirmSubmit) {
        // Perform additional actions or navigate to a different page
      } else {
        // Handle cancel
        setSuccessMessage('');
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 404) {
        // Handle customerId not found error
        setSuccessMessage('');
        setErrorMessage('Customer not found. Please enter a valid customer ID.');
      } else {
        // Handle other errors
        // Display a generic error message or take appropriate action
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row m-0">
        <div className="col-12 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Joinner Customer</h2>
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="row mb-4">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter First Name"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter Last Name"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="phoneNumber1" className="form-label">
                    Phone Number 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber1"
                    placeholder="Enter Phone Number 1"
                    name="phoneNumber1"
                    value={formState.phoneNumber1}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="phoneNumber2" className="form-label">
                    Phone Number 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber2"
                    placeholder="Enter Phone Number 2"
                    name="phoneNumber2"
                    value={formState.phoneNumber2}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter Address"
                    name="address"
                    value={formState.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="customerId" className="form-label">
                    Customer Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerId"
                    placeholder="Enter Customer Id"
                    name="customerId"
                   value={formState.customerId}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <MDBBtn type="submit">Submit</MDBBtn>
            </div>
          </form>
          {successMessage && (
            <div className="text-center mt-4">
              <p>{successMessage}</p>
            </div>
          )}
          {errorMessage && (
            <div className="text-center mt-4">
              <p className="text-danger">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterJoinerCustomer;