import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../service/Userservice";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchUsers = () => {
    const results = users.filter((user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
    setCurrentPage(1);
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await UserService.getAllCustomer(token);
        console.log("Full API response:", response); // Log the entire response object
        if (response) {
          if (Array.isArray(response)) {
            setUsers(response);
          } else {
            console.error("API response is not an array:", response);
          }
        } else {
          console.error("API response is undefined or invalid:", response);
        }
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      searchUsers();
    }
  }, [searchQuery, users]);

  const handleDownload = () => {
    let dataToDownload = [];

    if (searchQuery && searchResults.length > 0) {
      dataToDownload = searchResults;
    } else {
      dataToDownload = users;
    }

    if (dataToDownload.length === 0) {
      alert("No data to download");
      return;
    }

    const csvData = convertToCSV(dataToDownload);
    const link = document.createElement("a");
    link.href = encodeURI(`data:text/csv;charset=utf-8,${csvData}`);
    link.download = "users.csv";
    link.click();
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(",");
    const csvRows = data.map((row) =>
      Object.values(row)
        .map((value) => `"${value}"`)
        .join(",")
    );
    return `${headers}\n${csvRows.join("\n")}`;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderUsers = searchQuery
    ? searchResults
    : users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <div className="container-fluid h-100">
      <div className="py-4 h-100">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Search by first name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchQuery && (
            <button className="btn btn-primary ml-3" onClick={handleDownload}>
              Download Search Results
            </button>
          )}
        </div>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Customer ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">First Name (Khmer)</th>
              <th scope="col">Last Name (Khmer)</th>
              <th scope="col">Phone Number 1</th>
              <th scope="col">Phone Number 2</th>
              <th scope="col">Gender</th>
              <th scope="col">Map</th>
              <th scope="col">Cus Drive URl</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderUsers.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">
                  {(currentPage - 1) * usersPerPage + index + 1}
                </th>
                <td>{user.customerId}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.firstNameInKhmer}</td>
                <td>{user.lastNameInKhmer}</td>
                <td>{user.phoneNumbers1}</td>
                <td>{user.phoneNumbers2}</td>
                <td>{user.gender}</td>
                <td>
                  {user.googleMap ? (
                    <a
                      href={user.googleMap}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  {user.customerURLImage ? (
                    <a
                      href={user.customerURLImage}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Customer URL 
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  <Link className="btn btn-primary mr-2" to={`/users/${user.id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(users.length / usersPerPage) },
              (_, index) => index + 1
            ).map((number) => (
              <li
                key={number}
                className={`page-item ${
                  number === currentPage ? "active" : ""
                }`}
              >
                <button className="page-link" onClick={() => paginate(number)}>
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;
