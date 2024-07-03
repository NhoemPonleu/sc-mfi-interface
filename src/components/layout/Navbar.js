import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-primary ${
          isScrolled ? "fixed-top" : ""
        }`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/homepage">
            SC SYSTEM
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  View
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/about">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/service">
                      Service
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/customerlist">
                      Customer List
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/registerCustomer">
                      Register Customer
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/adduser">
                  Add User
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addJoiner">
                  Add Joiner
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/viewHello">
                  View Hello World
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
