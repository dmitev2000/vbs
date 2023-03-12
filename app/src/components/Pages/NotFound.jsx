import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container py-5" style={{minHeight: "calc(100vh - 170px)"}}>
      <h1 className="text-danger">Page Not Found</h1>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
