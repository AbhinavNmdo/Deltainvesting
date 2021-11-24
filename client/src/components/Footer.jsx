import React from "react";
import {  Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="container-fluid">
      <footer className="py-1">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-muted">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link px-2 text-muted">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/calculators" className="nav-link px-2 text-muted">
              Calculator
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cources" className="nav-link px-2 text-muted">
              Lecture Videos
            </Link>
          </li>
        </ul>
        <p className="text-center text-muted">
          Delta Investing Acadmy © 2021 Company, Inc
        </p>
      </footer>
    </div>
  );
};

export default Footer;
