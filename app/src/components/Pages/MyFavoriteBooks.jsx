import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DataTableComponent from "../DataTable/DataTableComponent";
import Loader from "../Loader/Loader";
import axios from "axios";

const MyFavoriteBooks = () => {
  const authCtx = useContext(AuthContext);
  const { user } = authCtx;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [favBooks, setFavBooks] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setLoading(true);
      axios
        .post("http://localhost:5000/api/books/fetch-fav", {
          bookIDs: user.favBooks,
        })
        .then((res) => {
          setFavBooks(res.data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [user.favBooks]);

  if (loading) {
    return (
      <div className="page-loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container py-5 page">
      <h1>My Favorite Books</h1>
      {user && user.favBooks.length === 0 ? (
        <p className="text-muted">You don't have any favorites yet.</p>
      ) : (
        <DataTableComponent books={favBooks} />
      )}
    </div>
  );
};

export default MyFavoriteBooks;
