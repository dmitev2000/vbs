import React from "react";
import "./Layout.css";
import logo from "../../assets/book.png";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="d-flex justify-content-start align-items-center">
          <img src={logo} alt="react-logo" style={{ maxHeight: "30px" }} />
          <p className="my-0 mx-2 text-muted">
            &copy; {new Date().getFullYear()} Wiki Books, Inc
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <i className="bi bi-facebook text-muted"></i>
          <i className="bi bi-instagram mx-4 text-muted"></i>
          <i className="bi bi-github text-muted"></i>
          <div className="d-flex justify-content-center align-items-center" style={{marginLeft: "25px"}}>
            <a
              rel="license"
              href="http://creativecommons.org/licenses/by-nc-nd/4.0/"
            >
              <img
                alt="Creative Commons License"
                style={{ borderWwidth: 0 }}
                src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png"
              />
            </a>
            <br />
            <a
              rel="license"
              href="http://creativecommons.org/licenses/by-nc-nd/4.0/"
            ></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
