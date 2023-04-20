import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import default_img from "../../assets/CoverNotFound.png";

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
    <div className="container page py-5 mt-5">
      <h1 className="mb-5 mt-4">Book Details: {id && id}</h1>
      <div className="d-flex gap-5">
        <div>
          {details.image ? (
            <img
              src={details.image.value}
              alt={details.bookLabel.value}
              loading="lazy"
            />
          ) : (
            <img src={default_img} alt="" />
          )}
        </div>
        <div className="mb-5">
          <h3>Title: {details.bookLabel.value}</h3>
          {details.title && <p>Original title: {details.title.value}</p>}
          <p>Type: {details.instanceOfLabel.value}</p>
          <p>
            Author:{" "}
            <Link to={`/authors/${authorID}`}>{details.authorLabel.value}</Link>
          </p>
          <p>
            Publication date:{" "}
            {details.date === undefined ||
            new Date(details.date.value).toString() === "Invalid Date"
              ? "Unknown"
              : !isNaN(details.date.value)
              ? details.date.value
              : new Date(details.date.value).toString().substring(4, 15)}
          </p>
          <p>Description: {details.bookDescription.value}</p>
        </div>
      </div>
      <Link
        className="find-books"
        to={{
          pathname: "/books",
        }}
      >
        Back to list
      </Link>
    </div>
  );
};

export default BookDetails;
