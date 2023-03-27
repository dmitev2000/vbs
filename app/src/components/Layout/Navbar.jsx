import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Book from "../../assets/book.png";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

const Navbar = () => {
  const AuthCtx = useContext(AuthContext);
  const { user, dispatch } = AuthCtx;
  const navigate = useNavigate();

  const Logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "error",
      title: `Goodbye ${user.username}! You are now logged out.`,
    });
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={Book}
            alt="book"
            className="mx-2"
            style={{ maxHeight: "30px" }}
          />
          <span>Wiki Books</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/books">
                Books
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/favorites">
                Favorites
              </NavLink>
            </li>
          </ul>
          {!user ? (
            <div className="text-light d-flex">
              <Link className="custom-button" to="/login">
                Login
              </Link>
              <Link className="mx-3 custom-button" to="/register">
                Register
              </Link>
            </div>
          ) : (
            <div>
              <span className="text-light">Hello, {user.username}</span>
              <button className="btn btn-danger mx-3" onClick={Logout} title="Logout">
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
