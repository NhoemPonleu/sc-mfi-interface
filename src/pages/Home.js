import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserService from "../components/service/Userservice";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { id } = useParams(); // Assuming you may use this later

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
        const token = localStorage.getItem('token');
        const response = await UserService.getAllCustomer(token);
        if (response && response.data) {
          setUsers(response.data); // Assuming response structure is { data: [...] }
        }
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    // Ensure searchUsers is defined before it's used in useEffect dependency array
    if (searchQuery) {
      searchUsers();
    }
  }, [searchQuery, users]); // Add users to the dependency array

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

  // Ensure renderUsers has a fallback in case users is not defined yet
  const renderUsers = searchQuery ? searchResults : users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

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
              <th scope="col">customer id generate</th>
              <th scope="col">customerId</th>
              <th scope="col">firstName</th>
              <th scope="col">lastName</th>
              <th scope="col">firstNameInKhmer</th>
              <th scope="col">lastNameInKhmer</th>
              <th scope="col">phoneNumbers1</th>
              <th scope="col">phoneNumbers2</th>
              <th scope="col">gender</th>
              <th scope="col">Map</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderUsers.map((user, index) => (
              <tr key={index}>
                <th scope="row">{(currentPage - 1) * usersPerPage + index + 1}</th>
                <td>{user.id}</td>
                <td>{user.customerId}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.firstNameInKhmer}</td>
                <td>{user.lastNameInKhmer}</td>
                <td>{user.phoneNumbers1}</td>
                <td>{user.phoneNumbers2}</td>
                <td>{user.gender}</td>
                <td>
                  <a href={user.googleMap} target="_blank" rel="noopener noreferrer">
                    Open in Google Maps
                  </a>
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
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => index + 1).map((number) => (
              <li
                key={number}
                className={`page-item ${number === currentPage ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(number)}
                >
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
