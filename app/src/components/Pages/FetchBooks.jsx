import React, { useState, useEffect } from "react";
import DataTable from "../DataTable/DataTable";
import Loader from "../Loader/Loader";
import axios from "axios";

const FetchBooks = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/books/fetch/")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  if (loading) {
    return (
      <div className="page-loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-5">Fetched books from WikiData: </h1>
      <DataTable books={data} />
    </div>
  );
};

export default FetchBooks;
