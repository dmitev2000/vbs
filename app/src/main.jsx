import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout/Layout";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Layout>
      <App />
    </Layout>
  </Router>
);
