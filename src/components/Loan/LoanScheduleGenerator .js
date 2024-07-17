import React, { useState } from 'react';
import './LoanSheduleGenerator.css'; // Assuming you have a CSS file for styling
import LoanService from '../service/LoanService'; // Replace with your actual service import
import * as XLSX from 'xlsx'; // Import xlsx library

const LoanScheduleGenerator = () => {
  const [loanId, setLoanId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [loanSchedule, setLoanSchedule] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'loanId') {
      setLoanId(value);
    } else if (name === 'startDate') {
      setStartDate(value);
    }
  };

  const handleGenerateSchedule = async () => {
    try {
      // Replace with your actual token logic
      const token = localStorage.getItem('token');
      const userData = { loanId, startDate };
      const data = await LoanService.registerSchedule(userData, token); // Replace with your actual service call
      setLoanSchedule(data);
      setError(null);
    } catch (err) {
      console.error('Error generating loan schedule:', err);
      setError('Error generating loan schedule');
    }
  };

  const handlePrintSchedule = () => {
    if (!loanSchedule) {
      alert('Loan schedule data is not available.');
      return;
    }

    setTimeout(() => {
      window.print();
    }, 500); // Adjust delay as needed
  };

  const handleExportToExcel = () => {
    if (!loanSchedule) return;

    const worksheet = XLSX.utils.json_to_sheet(loanSchedule.loanScheduleItems);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'LoanSchedule');
    XLSX.writeFile(workbook, 'loan_schedule.xlsx');
  };

  return (
    <div className="loan-schedule-generator">
      <h2>Loan Schedule Generator</h2>
      <div className="input-container hide-on-print">
        <label htmlFor="loanId">Enter Loan ID:</label>
        <input
          type="text"
          id="loanId"
          name="loanId"
          value={loanId}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-container hide-on-print">
        <label htmlFor="startDate">Enter Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleGenerateSchedule} className="hide-on-print">Generate Schedule</button>
      {loanSchedule && (
        <>
          <button onClick={handlePrintSchedule} className="hide-on-print">Print Schedule</button>
          <button onClick={handleExportToExcel} className="hide-on-print">Export to Excel</button>
          <div className="schedule-container">
            <h3>Loan Payment Schedule</h3>
            <h3>Co name</h3>
            <h3>Date</h3>
            <table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Principal Payment</th>
                  <th>Interest Payment</th>
                  <th>Total Payment</th>
                  <th>Remaining Balance</th>
                  <th>Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {loanSchedule.loanScheduleItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.month}</td>
                    <td>${item.principalPayment.toFixed(2)}</td>
                    <td>${item.interestPayment.toFixed(2)}</td>
                    <td>${item.totalPayment.toFixed(2)}</td>
                    <td>${item.remainingBalance.toFixed(2)}</td>
                    <td>{item.paymentDate}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="6">
                    Total Principal Paid: ${loanSchedule.totalPrincipalPaid.toFixed(2)} | Total Interest Paid: ${loanSchedule.totalInterestPaid.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoanScheduleGenerator;
