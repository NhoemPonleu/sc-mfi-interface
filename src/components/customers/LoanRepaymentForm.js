import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import LoanSerVice from '../service/LoanService';

const LoanRepaymentForm = () => {
  const initialFormData = {
    loanId: '',
    repaymentAmount: '',
    repaymentDate: '',
    referenceNumber: '',
    paidFromBank: ''
  };

  const [formData, setFormData] = useState(initialFormData);

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

      const response = await LoanSerVice.registerLoanRepayment(formData, token);
      alert('Loan repayment successful');
      setFormData(initialFormData); // Reset form fields to initial empty values
    } catch (error) {
      console.error('There was an error making the repayment!', error);
      if (error.response && error.response.status === 404) {
        const responseData = error.response.data;
        if (responseData.message && responseData.message.includes('Loan not found')) {
          alert('Loan with the provided ID not found.');
        } else {
          alert('Loan not found due to an unexpected error.');
        }
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
    </Container>
  );
};

export default LoanRepaymentForm;
