import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";

const BookDetails = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/fetch-by-id", { id: id })
      .then((res) => {
        setDetails(res.data[0]);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <div className="page-loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container page py-5">
      <h1>Book Details: {id && id}</h1>
      <p>Title: {details.bookLabel.value}</p>
      <p>Author: {details.authorLabel.value}</p>
      <p>
        <a href={details.author.value}>About author</a>
      </p>
      <p>Description: {details.bookDescription.value}</p>
      {details.image && (
        <img src={details.image.value} alt={details.title.value} />
      )}
    </div>
  );
};

export default BookDetails;
