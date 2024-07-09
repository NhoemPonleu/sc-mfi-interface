import axios from "axios";

class LoanSerVice {
   static BASE_URL = "https://sc-mfi.onrender.com";
   // static BASE_URL = "http://localhost:1010";
    
   static async registerShedule(userData, token) {
    try {
        console.log("Request URL:", `${LoanSerVice.BASE_URL}/api/v1/loan/shedule`);
      const response = await axios.post(
        `${LoanSerVice.BASE_URL}/api/v1/loan/shedule`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async getUserById(userId, token) {
    try {
      const response = await axios.get(`${LoanSerVice.BASE_URL}/api/v1/loan/${userId}/payment-status`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }

}
export default LoanSerVice;
