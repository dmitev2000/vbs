import React, { useState, useEffect, useContext } from "react";
import DataTable from "../DataTable/DataTableComponent";
import Loader from "../Loader/Loader";
import axios from "axios";
import BookContext from "../../context/BooksContext";

const FetchBooks = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const BookCtx = useContext(BookContext);

  const Fetch = async () => {
    const result = await axios
      .get("http://localhost:5000/api/books/fetch/")
      .then((res) => {
        setData(res.data);
        BookCtx.updateBooks(res.data);
      })
      .catch((err) => console.log(err.message));
      return result;
  };

  useEffect(() => {
    setLoading(true);
    if (BookCtx.books) {
      setData(BookCtx.books);
      setLoading(false);
    } else {
      Fetch()
        .then(() => {
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (loading) {
    return (
      <div className="page-loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container py-5 mt-5">
      <h1 className="my-5">Fetched books from WikiData: </h1>
      <DataTable books={data} />
    </div>
  );
};

export default FetchBooks;
