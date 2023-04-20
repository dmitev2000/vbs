import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import DataTableComponent from "../DataTable/DataTableComponent";
import Loader from "../Loader/Loader";
import axios from "axios";
import open_book from '../../assets/open-book.png';

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
  }, []);

  if (loading) {
    return (
      <div className="page-loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container py-5 page">
      {user && user.favBooks.length === 0 ? (
        <div className="zero-favs text-center">
          <img className="m-5" src={open_book} alt="open-book" />
          <h2>Your favorites list is <span style={{color: "#b10e0e"}}>empty</span>.</h2>
          <h5 className="text-muted">Looks like you haven't find anything interesting yet.</h5>
          <Link className="find-books" to="/books">Find one now</Link>
        </div>
      ) : (
        <div className="mt-4 pt-1">
          <h1 className="my-5">My Favorite Books</h1>
          <DataTableComponent books={favBooks} />
        </div>
      )}
    </div>
  );
};

export default MyFavoriteBooks;
