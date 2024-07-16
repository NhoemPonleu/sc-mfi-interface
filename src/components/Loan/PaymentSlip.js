import React, { useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import logo from '../asset/Logo512/Logo512.png'; // Make sure the path is correct

const PaymentSlip = ({ open, onClose, formData }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Payment Slip</title>
          <h1>Sachack Microfinance PLC</h1>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .logo {
              width: 100px;
              height: auto;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <img src="${logo}" class="logo" alt="Logo" />
          ${printRef.current.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Payment Slip</DialogTitle>
      <DialogContent ref={printRef}>
        {formData ? (
          <DialogContentText>
            <strong>Loan ID:</strong> {formData.loanId} <br />
            <strong>Customer Name:</strong> {formData.customerName} <br />
            <strong>Repayment Amount:</strong> {formData.repaymentAmount} <br />
            <strong>Repayment Date:</strong> {formData.repaymentDate} <br />
            <strong>Reference Number:</strong> {formData.referenceNumber} <br />
            <strong>Paid From Bank:</strong> {formData.paidFromBank}
          </DialogContentText>
        ) : (
          <DialogContentText>
            No data available.
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePrint} color="primary">
          Print
        </Button>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentSlip;
