import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";

const BookDetails = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorID, setAuthorID] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/books/fetch-by-id", { id: id })
      .then((res) => {
        setDetails(res.data[0]);
        setLoading(false);
        const author = res.data[0].author.value;
        const split = author.split("/");
        setAuthorID(split[split.length - 1]);
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
      <h1 className="mb-5">Book Details: {id && id}</h1>
      <p>Title: {details.bookLabel.value}</p>
      {details.title && <p>Original title: {details.title.value}</p>}
      <p>Type: {details.instanceOfLabel.value}</p>
      <p>
        Author: {" "}
        <Link to={`/authors/${authorID}`}>{details.authorLabel.value}</Link>
      </p>
      <p>
        Publication date:{" "}
        {details.date === undefined ||
        new Date(details.date.value).toString() === "Invalid Date"
          ? "Unknown"
          : new Date(details.date.value).toString()}
      </p>
      <p>Description: {details.bookDescription.value}</p>
      {details.image && (
        <img
          src={details.image.value}
          alt={details.bookLabel.value}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default BookDetails;
