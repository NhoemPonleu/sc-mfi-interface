import axios from 'axios';

class LoanService {
  static BASE_URL = "https://sc-mfi.onrender.com";
 //static BASE_URL = 'http://localhost:1010';

  static async registerSchedule(userData, token) {
    try {
      console.log('Request URL:', `${LoanService.BASE_URL}/api/v1/loan/schedule`);
      const response = await axios.post(
        `${LoanService.BASE_URL}/api/v1/loan/schedule`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async registerNewLoan(userData, token) {
    try {
      console.log('Request URL:', `${LoanService.BASE_URL}/api/v1/loan`);
      const response = await axios.post(
        `${LoanService.BASE_URL}/api/v1/loan`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getLoanById(loanId, token) {
    try {
      const response = await axios.get(`${LoanService.BASE_URL}/api/v1/loan/loanId/${loanId}/loan`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async registerLoanRepayment(formData, token) {
    try {
      console.log('Request URL:', `${LoanService.BASE_URL}/api/v1/loan/repayment`);
      const response = await axios.post(`${LoanService.BASE_URL}/api/v1/loan/repayment`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      if (err.response) {
        console.error('Error Response:', err.response.data);
        console.error('Error Status:', err.response.status);
        console.error('Error Headers:', err.response.headers);
      } else if (err.request) {
        console.error('Error Request:', err.request);
      } else {
        console.error('Error Message:', err.message);
      }
      throw err;
    }
  }
  

  static async getUserById(userId, token) {
    try {
      const response = await axios.get(`${LoanService.BASE_URL}/api/v1/loan/${userId}/payment-status`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem('role');
    return role === 'ADMIN';
  }

  static isUser() {
    const role = localStorage.getItem('role');
    return role === 'USER';
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }
}

export default LoanService;
