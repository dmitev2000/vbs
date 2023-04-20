import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setError("Passwords don't match.");
      return;
    }
    setError(null);
    await axios
      .post("http://localhost:5000/api/auth/register", {
        username: username,
        password: password,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center page">
      <div className="auth">
        <h1 className="my-4 auth-title">Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              autoComplete="off"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
              minLength={8}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              required
              minLength={8}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          {error && (
            <>
              <span className="text-danger fw-bold mb-3">{error}</span>
              <br />
              <br />
            </>
          )}
          <button type="submit" className="find-books-lite">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
