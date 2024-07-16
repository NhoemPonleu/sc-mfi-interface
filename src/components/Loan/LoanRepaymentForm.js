import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import LoanService from '../service/LoanService';
import PaymentSlip from './PaymentSlip';

const LoanRepaymentForm = () => {
  const initialFormData = {
    loanId: '',
    repaymentAmount: '',
    customerName: '',
    repaymentDate: '',
    referenceNumber: '',
    paidFromBank: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showSlip, setShowSlip] = useState(false);
  const [submittedData, setSubmittedData] = useState(null); // To store submitted data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm('Are you sure you want to submit this repayment?');
    if (!confirmed) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // Fetch customer name using loan ID
      const loanData = await LoanService.getLoanById(formData.loanId, token);
      const updatedFormData = { ...formData, customerName: loanData.customerName };

      // Debug: Log the token and updated form data
      console.log('Token:', token);
      console.log('Updated Form Data:', updatedFormData);

      const response = await LoanService.registerLoanRepayment(updatedFormData, token);
      alert('Loan repayment successful');
      setSubmittedData(updatedFormData); // Store the submitted data
      setShowSlip(true); // Show the payment slip
      setFormData(initialFormData); // Reset form fields to initial empty values

      // Example: Log or use the response data
      console.log('Response:', response);
    } catch (error) {
      console.error('There was an error making the repayment!', error);
      if (error.response && error.response.status === 404) {
        const responseData = error.response.data;
        if (responseData.message && responseData.message.includes('Loan not found')) {
          alert('Loan with the provided ID not found.');
        } else {
          alert('Loan not found due to an unexpected error.');
        }
      } else if (error.response && error.response.status === 403) {
        alert('You are not authorized to make this repayment. Please check your permissions.');
      } else {
        alert('There was an error making the repayment: ' + error.message);
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
          Loan Repayment
        </Typography>
        <TextField
          label="Loan ID"
          type="number"
          name="loanId"
          value={formData.loanId}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Repayment Amount"
          type="number"
          name="repaymentAmount"
          value={formData.repaymentAmount}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Repayment Date"
          type="date"
          name="repaymentDate"
          value={formData.repaymentDate}
          onChange={handleChange}
          required
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          label="Reference Number"
          type="text"
          name="referenceNumber"
          value={formData.referenceNumber}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Paid From Bank"
          type="text"
          name="paidFromBank"
          value={formData.paidFromBank}
          onChange={handleChange}
          required
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>

      <PaymentSlip
        open={showSlip}
        onClose={() => setShowSlip(false)}
        formData={submittedData} // Pass the submitted data to the PaymentSlip component
      />
    </Container>
  );
};

export default LoanRepaymentForm;
