import React, { useState } from "react";
import logo from "../assets/logo.png";
import "../Components/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <img className="nav-logo" src={logo} alt="" />
        </div>
        <div className="nav-links">
          <a href="/" className="nav-link">
            <span>Home</span>
          </a>
          <a href="/results" className="nav-link">
            Find your car
          </a>
          <a className="nav-btn">Contact</a>
        </div>
        <div id="phone-nav">
          <FontAwesomeIcon
            className="bar-menu"
            icon={faBars}
            onClick={toggleMenu}
          />
          <div className={`showMenu ${isOpen ? "active" : ""}`}>
            <a href="/" className="showMenu-link">
              Home
            </a>
            <a href="/results" className="showMenu-link">
              Find Your Car
            </a>
            <a href="/" className="showMenu-link">
              Contact
            </a>
            <FontAwesomeIcon
              className="close-btn"
              icon={faTimes}
              onClick={toggleMenu}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
