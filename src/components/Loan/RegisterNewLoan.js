import React, { useState } from 'react';
import { Container, Box, TextField, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import LoanService from '../service/LoanService';

const RegisterNewLoan = () => {
  const initialFormData = {
    amount: '',
    customerId: '',
    term: '',
    interestRate: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm('Are you sure you want to submit this loan registration?');
    if (!confirmed) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await LoanService.registerNewLoan(formData, token);
      alert('Loan registration successful');
      setFormData(initialFormData); // Reset form fields to initial empty values

      // Navigate to list of loans page
      navigate('/listloan');

      // Example: Log or use the response data
      console.log('Response:', response);
    } catch (error) {
      console.error('There was an error registering the loan!', error);
      if (error.response && error.response.status === 404) {
        const responseData = error.response.data;
        if (responseData.message && responseData.message.includes('Customer Not found')) {
          alert(`Customer Not Found with ID: ${formData.customerId}`);
        } else {
          alert('Loan registration failed due to an unexpected error.');
        }
      } else {
        alert('There was an error registering the loan: ' + error.message);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Register New Loan
        </Typography>
        <TextField
          label="Amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Customer ID"
          type="number"
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Term (months)"
          type="number"
          name="term"
          value={formData.term}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Interest Rate (%)"
          type="number"
          name="interestRate"
          value={formData.interestRate}
          onChange={handleChange}
          required
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterNewLoan;
