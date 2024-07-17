import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, Button, Pagination } from '@mui/material';

const LoanList = () => {
  const [loanList, setLoanList] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [page, setPage] = useState(0); // Current page number
  const [pageSize, setPageSize] = useState(10); // Number of items per page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages

  useEffect(() => {
    fetchData(); // Initial fetch when component mounts
  }, [page, pageSize, customerName, customerId]); // Fetch data when page, pageSize, customerName, or customerId changes

  const fetchData = async () => {
    try {
      let url = `https://sc-mfi.onrender.com/api/v1/loan?page=${page}&size=${pageSize}`;
      if (customerName || customerId) {
        url += `&customerName=${customerName}&customerId=${customerId}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch loan data');
      }
      const data = await response.json();
      setLoanList(data.content || []); // Ensure data.content is initialized as an empty array if undefined
      setTotalPages(data.totalPages || 0); // Ensure data.totalPages is initialized as 0 if undefined
    } catch (error) {
      console.error('Error fetching loan data:', error);
      // Handle error state or alert the user
    }
  };

  const handleFilter = async () => {
    try {
      setPage(0); // Reset page to fetch from the first page
      let url = `https://sc-mfi.onrender.com/api/v1/loan?page=0&size=${pageSize}`;
      if (customerName || customerId) {
        url += `&customerName=${customerName}&customerId=${customerId}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch filtered loan data');
      }
      const data = await response.json();
      setLoanList(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      console.error('Error fetching filtered loan data:', error);
      // Handle error state or alert the user
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1); // Pagination component starts counting pages from 1
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
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
                  <TableCell>Term/months</TableCell>
                  <TableCell>Interest Rate (%)</TableCell>
                  <TableCell>First Amount</TableCell>
                  <TableCell>After Balance</TableCell>
                  <TableCell>Fee Amount</TableCell>
                  <TableCell>Status</TableCell>
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
                    <TableCell>{loan.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Pagination controls */}
          <Box mt={3} sx={{ display: 'flex', justifyContent: 'center' }}>
  <Pagination
    count={totalPages}
    page={page + 1} // Pagination component starts counting pages from 1
    onChange={handlePageChange}
    color="primary" // Set color to primary
    size="large"
    showFirstButton
    showLastButton
    sx={{
      '& .Mui-selected': {
        color: '#1976d2', // Blue text color for selected page
        '&:hover': {
          backgroundColor: 'transparent', // No background color on hover
        },
      },
      '& .MuiPaginationItem-root': {
        color: '#1976d2', // Blue text color for non-selected pages
        '&:hover': {
          backgroundColor: 'transparent', // No background color on hover
        },
      },
    }}
  />
</Box>

        </Box>
      </Container>
    </Box>
  );
};

export default LoanList;
