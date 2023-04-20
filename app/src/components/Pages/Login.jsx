import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { dispatch } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const handleLogin = async (e) => {
    setError(null);
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      localStorage.setItem(
        "user",
        JSON.stringify({ _id: res.data._id, username: res.data.username })
      );
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
        icon: "success",
        title: `Hello ${res.data.username}! You are now logged in.`,
      });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      setError(err.response.data);
    }
  };
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center page">
      <div className="auth">
        <h1 className="my-4 auth-title">Sign in</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              minLength={8}
              onChange={handleChange}
            />
          </div>
          <span className="fw-bold text-muted">Don't have an account? </span>
          <Link to="/register">Sign up</Link>
          <br /> <br />
          {error && (
            <>
              <span className="text-danger fw-bold mb-3">{error}</span>
              <br />
              <br />
            </>
          )}
          <button type="submit" className="find-books-lite">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
