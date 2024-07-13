import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Grid,
  Typography,
  Container,
  Box,
} from '@mui/material';
import UserService from "../service/Userservice";

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
    customerURLImage: "",
    homeNo: "",
    streetNo: "",
    currentAddress: "",
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
    homeNo,
    streetNo,
    currentAddress,
    husbandPhone1,
  } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(`Updated ${e.target.name}:`, e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting user data:", user);
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
    <Container maxWidth="md">
      <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>First Name</Typography>
            <TextField
              name="firstName"
              value={firstName}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter first name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Last Name</Typography>
            <TextField
              name="lastName"
              value={lastName}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter last name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Phone Numbers 1</Typography>
            <TextField
              name="phoneNumbers1"
              value={phoneNumbers1}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter phone number 1"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Phone Numbers 2</Typography>
            <TextField
              name="phoneNumbers2"
              value={phoneNumbers2}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter phone number 2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Input map URL</Typography>
            <TextField
              name="googleMap"
              value={googleMap}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Map URLs"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Input customer image URL</Typography>
            <TextField
              name="customerURLImage"
              value={customerURLImage}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Customer drive URLs"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Family Phone Number</Typography>
            <TextField
              name="husbandPhone1"
              value={husbandPhone1}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter family phone number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Home No</Typography>
            <TextField
              name="homeNo"
              value={homeNo}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter home number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Street No</Typography>
            <TextField
              name="streetNo"
              value={streetNo}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter street number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Address</Typography>
            <TextField
              name="currentAddress"
              value={currentAddress}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter current address"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Enter amount</Typography>
            <TextField
              name="amount"
              value={amount}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter amount"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Enter status</Typography>
            <TextField
              name="status"
              value={status}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter status"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Enter first name in Khmer</Typography>
            <TextField
              name="firstNameInKhmer"
              value={firstNameInKhmer}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter first name in Khmer"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Enter last name in Khmer</Typography>
            <TextField
              name="lastNameInKhmer"
              value={lastNameInKhmer}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter last name in Khmer"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Enter marital status</Typography>
            <TextField
              name="maritalStatus"
              value={maritalStatus}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter marital status"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Enter employee type</Typography>
            <TextField
              name="employeeType"
              value={employeeType}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter employee type"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Enter gender</Typography>
            <TextField
              name="gender"
              value={gender}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter gender"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Enter resident</Typography>
            <TextField
              name="resident"
              value={resident}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter resident"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Enter identity number</Typography>
            <TextField
              name="identityNo"
              value={identityNo}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter identity number"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="createAccount"
                  checked={createAccount}
                  onChange={() => setUser({ ...user, createAccount: !createAccount })}
                />
              }
              label="Create an account?"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Register Customer
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Repayment;
