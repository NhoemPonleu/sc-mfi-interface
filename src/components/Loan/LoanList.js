import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, Button } from '@mui/material';

const LoanList = () => {
  const [loanList, setLoanList] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'https://sc-mfi.onrender.com/api/v1/loan';
        if (customerName || customerId) {
          url += `?customerName=${customerName}&customerId=${customerId}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch loan data');
        }
        const data = await response.json();
        setLoanList(data); // Assuming data is an array of loan objects
      } catch (error) {
        console.error('Error fetching loan data:', error);
        // Handle error state or alert the user
      }
    };

    fetchData(); // Initial fetch when component mounts
  }, [customerName, customerId]);

  const handleFilter = async () => {
    try {
      let url = 'https://sc-mfi.onrender.com/api/v1/loan';
      if (customerName || customerId) {
        url += `?customerName=${customerName}&customerId=${customerId}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch filtered loan data');
      }
      const data = await response.json();
      setLoanList(data);
    } catch (error) {
      console.error('Error fetching filtered loan data:', error);
      // Handle error state or alert the user
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Loan List
        </Typography>
        <Box mt={3} sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Customer Name"
            variant="outlined"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <TextField
            label="Customer ID"
            variant="outlined"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleFilter}>
            Filter
          </Button>
        </Box>
        <Box mt={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Term</TableCell>
                  <TableCell>Interest Rate (%)</TableCell>
                  <TableCell>First Amount</TableCell>
                  <TableCell>After Balance</TableCell>
                  <TableCell>Fee Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loanList.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell>{loan.id}</TableCell>
                    <TableCell>{loan.customerId}</TableCell>
                    <TableCell>{loan.customerName}</TableCell>
                    <TableCell>{loan.amount}</TableCell>
                    <TableCell>{loan.term}</TableCell>
                    <TableCell>{loan.interestRate}</TableCell>
                    <TableCell>{loan.firstAmount}</TableCell>
                    <TableCell>{loan.afterBalance}</TableCell>
                    <TableCell>{loan.feeAmount ?? 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default LoanList;
