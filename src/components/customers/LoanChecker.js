import React, { useState } from 'react';
import axios from 'axios';
import LoanSerVice from '../service/LoanService';

const LoanStatusChecker = () => {
  const [loanId, setLoanId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setLoanId(event.target.value);
  };

  const handleCheckStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await getUserById(loanId, token); // Calling the function directly here
      setPaymentStatus(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching loan status:', err);
      setError('Error fetching status');
    }
  };

  const getUserById = async (userId, token) => {
    try {
      const response = await axios.get(`${LoanSerVice.BASE_URL}/api/v1/loan/${userId}/payment-status`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  return (
    <div>
      <h2>Loan Status Checker</h2>
      <input
        type="text"
        placeholder="Enter Loan ID"
        value={loanId}
        onChange={handleInputChange}
      />
      <button onClick={handleCheckStatus}>Check Status</button>

      {error && <p>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Principal </th>
            <th>Interest</th>
            <th>Total Payment Due</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paymentStatus.map((payment, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
              <td>{payment.month}</td>
              <td>{payment.principalPaid}</td>
              <td>{payment.interestPaid}</td>
              <td>${payment.totalPaymentDue}</td>
              <td style={{ color: payment.status === 'Not Paid' ? 'red' : 'inherit' }}>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanStatusChecker;
