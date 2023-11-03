import "./Navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import IMG from '../../assets/images/iconImg.jpg';
const Sidebar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary bg-dark"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand nav-icon-name" to={`/`} title="Home">
          <img src={IMG} alt="" className="rounded icon-image"/>
          Hillside Heaven
        </Link>
        <button
          className="navbar-toggler bg-secondary"
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
            <li className="nav-item">
              <Link title="Home" className="nav-link" to={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link title="Book Room" className="nav-link" to={`/book`}>
                Book Room
              </Link>
            </li>
            <li className="nav-item">
              <Link title="Edit Booking" className="nav-link" to={`/edit`}>
                Edit Booking
              </Link>
            </li>
            <li className="nav-item">
              <Link title="Cancel Booking" className="nav-link" to={`/cancel`}>
                Cancel Booking
              </Link>
            </li>
            <li className="nav-item">
              <Link title="Checkout" className="nav-link" to={`/checkout`}>
                Checkout
              </Link>
            </li>
            <li className="nav-item">
              <Link title="Refund & Payment" className="nav-link" to={`/refund`}>
              ₹ Refund & Payment
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
