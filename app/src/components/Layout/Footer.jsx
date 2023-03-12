import React from "react";
import "./Layout.css";
import logo from '../../assets/book.png';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="d-flex justify-content-start align-items-center">
          <img src={logo} alt="react-logo" style={{maxHeight: "30px"}} />
          <p className="my-0 mx-2 text-muted">
            &copy; {new Date().getFullYear()} Wiki Books, Inc
          </p>
        </div>
        <div>
          <i className="bi bi-facebook text-muted"></i>
          <i className="bi bi-instagram mx-4 text-muted"></i>
          <i className="bi bi-github text-muted"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
