import React, { useState } from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import './LoanShedule.css'; // Import CSS file for styling
import UserService from "../service/Userservice";

// Function to convert numeric month to Khmer month and format the date
const convertToKhmerMonth = (dateStr) => {
  const date = new Date(dateStr);
  const khmerMonths = [
    "មករា", "កុម្ភៈ", "មិនា", "មេសា", "ឧសភា", "មិថុនា",
    "កក្តដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"
  ];
  const day = ('0' + date.getDate()).slice(-2);
  const month = khmerMonths[date.getMonth()];
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function LoanSchedule() {
  const [formData, setFormData] = useState({
    loanId: "",
    startDate: ""
  });

  const [schedule, setSchedule] = useState(null);

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.registerShedule(formData, token);

      // Convert paymentDate to Khmer months in the received schedule
      const updatedSchedule = {
        ...response,
        loanScheduleItems: response.loanScheduleItems.map(item => ({
          ...item,
          paymentDate: convertToKhmerMonth(item.paymentDate)
        }))
      };

      console.log('Schedule generated:', updatedSchedule);
      setSchedule(updatedSchedule);
    } catch (error) {
      console.error("Error generating loan schedule:", error);
    }
  };

  const printSchedule = () => {
    window.print();
  };

  return (
    <div className='container' style={{ width: '60%' }}>
      <form onSubmit={onSubmit} className="print-hide">
        <MDBRow className='mb-4'>
          <MDBCol>
            <p className="text-muted">Loan ID</p>
            <MDBInput name="loanId"
              value={formData.loanId}
              onChange={onInputChange}
              id='formLoanId'
              label='' placeholder="Enter loan ID" />
          </MDBCol>
          <MDBCol>
            <p className="text-muted">Start Date</p>
            <MDBInput name="startDate"
              value={formData.startDate}
              onChange={onInputChange}
              id='formStartDate' label=''
              type="date" placeholder="Enter start date" />
          </MDBCol>
        </MDBRow>

        <MDBBtn className='mb-4' type='submit' block>
          Generate Schedule
        </MDBBtn>
      </form>

      {schedule && (
  <div className="print-only">
    <h4>NameCo: Company Name</h4>
    <h4>Date Of Borrow: {formData.startDate}</h4>
    <h4>Name Customer: Customer Name</h4>
    <h3>Loan Schedule</h3>
    <table className="table table-striped">
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
        {schedule.loanScheduleItems.map((item, index) => (
          <tr key={index}>
            <td>{item.month}</td>
            <td>{item.principalPayment}</td>
            <td>{item.interestPayment}</td>
            <td>{item.totalPayment}</td>
            <td>{item.remainingBalance}</td>
            <td>{item.paymentDate}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h4>Total Principal Paid: {schedule.totalPrincipalPaid}</h4>
    <h4>Total Interest Paid: {schedule.totalInterestPaid}</h4>
    <MDBBtn onClick={printSchedule} block>
      Print Schedule
    </MDBBtn>
  </div>
)}



    </div>
  );
}

export default LoanSchedule;
