import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  render() {
    const role = sessionStorage.getItem("userType");
    console.log(role);
    const userName = sessionStorage.getItem("userName")
    let elementCreateUser =
      <li className="navbar-item">
        <Link to="/createUser" className="nav-link">
          Create User
        </Link>
      </li>;
    let elementCreateProduct =
      <li className="navbar-item">
        <Link to="/createProduct" className="nav-link">
          Create Product
        </Link>
      </li>;
    let elementUsers =
      <li className="navbar-item">
        <Link to="/users" className="nav-link">
          Users
        </Link>
      </li>
    let elementProducts =
      <li className="navbar-item">
        <Link to="/products" className="nav-link">
          Products
        </Link>
      </li>
    let elementCreateOrder =
      <li className="navbar-item">
        <Link to="/orders" className="nav-link">
          Orders
        </Link>
      </li>
      

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="navbar-brand">FoodSC</div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {(role === "admin") ? elementCreateUser : ""}
            {/* { (role === "admin") ? elementUsers:""} */}

            {(role === "manufacturer") ? elementCreateProduct : ""}
            {(role && role !== "admin") ? elementProducts : ""}
            {(role === "consumer") ? elementCreateOrder : ""}
            {(role)?<li className="navbar-item">
              <Link to="/users" className="nav-link">
                Users
              </Link>
            </li>:""}
            {/* <li className="navbar-item">
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
            </li> */}
            {(role) ? <button className="navbar-item" id="signin"
              style={{ width: "auto", backgroundColor: "white", borderRadius: "30px", position: "absolute", right: "20px" }}
              onClick={() => {
                sessionStorage.clear();
                window.location = "/";
              }}
              onMouseOver={() => {
                var p = document.getElementById("name");
                p.innerHTML = "logout";
              }}
              onMouseLeave={() => {
                var p = document.getElementById("name");
                p.innerHTML = userName;
              }}>
              {/* <Link to="/" className="nav-link"> */}
              <p style={{ minWidth: "80px", height: "15px", color: "black", fontWeight: "bold", fontSize: "17px" }} id="name">{userName}</p>
              {/* //</Link> */}
            </button>
              : ""}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
