import React from "react";
import CartWidget from "../CartWidget/CartWidget";
import { Link } from "react-router-dom";
import Category from "../Category/Category";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          TopDrinks
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto List-ul mb-2 mb-lg-0">
            <CartWidget />
            </ul>
            <ul className="navbar-nav me-auto position-absolute top-50 start-50 translate-middle">
              <li className="nav-item">
                <Category className="d-inline-flex p-2"></Category>
              </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
