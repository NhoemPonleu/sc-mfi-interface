import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Dashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [totalLoan, setTotalLoan] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);

    useEffect(() => {
        // Static data for customers
        const staticCustomers = [
            { id: 1, name: 'John Doe', loanAmount: 5000, interest: 500 },
            { id: 2, name: 'Jane Smith', loanAmount: 10000, interest: 1000 },
            { id: 3, name: 'Alice Johnson', loanAmount: 7500, interest: 750 },
        ];

        // Static total loan amount
        const staticTotalLoan = staticCustomers.reduce((sum, customer) => sum + customer.loanAmount, 0);

        // Static total interest amount
        const staticTotalInterest = staticCustomers.reduce((sum, customer) => sum + customer.interest, 0);

        // Set the state with the static data
        setCustomers(staticCustomers);
        setTotalLoan(staticTotalLoan);
        setTotalInterest(staticTotalInterest);
    }, []);

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Loan Dashboard
                </Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                        <PeopleIcon fontSize="large" />
                        <Typography variant="h6">Total Customers</Typography>
                        <Typography variant="h4">{customers.length}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                        <AccountBalanceIcon fontSize="large" />
                        <Typography variant="h6">Total Loan Amount</Typography>
                        <Typography variant="h4">${totalLoan.toFixed(2)}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                        <MonetizationOnIcon fontSize="large" />
                        <Typography variant="h6">Total Interest</Typography>
                        <Typography variant="h4">${totalInterest.toFixed(2)}</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Box my={4}>
                <Typography variant="h6">Customer Details</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Loan Amount</TableCell>
                                <TableCell>Interest</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>${customer.loanAmount.toFixed(2)}</TableCell>
                                    <TableCell>${customer.interest.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}

export default Dashboard;
