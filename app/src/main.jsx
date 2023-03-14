import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { AuthContextProvider } from "./context/AuthContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <Router>
      <Layout>
        <App />
      </Layout>
    </Router>
  </AuthContextProvider>
);
