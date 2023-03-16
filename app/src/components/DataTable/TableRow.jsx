import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CoverNotFound from "../../assets/CoverNotFound.png";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import axios from "axios";

const TableRow = ({ book }) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { user, dispatch } = authCtx;
  const split = book.book.value.split("/");
  const bookID = split[split.length - 1];

  const showDetails = () => {
    navigate(`/books/${bookID}`);
  };

  const AddToFavoritesHandler = () => {
    axios
      .post("http://localhost:5000/api/favorites/add", {
        userId: user._id,
        bookId: bookID,
      })
      .then((res) => {
        const books = user.favBooks;
        books.push(res.data);
        const newUser = user;
        user.favBooks = books;
        dispatch({ type: "UPDATE_BOOKS", payload: newUser });
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: "The book has been successfully added to your favorites.",
        });
      })
      .catch((err) => console.error(err));
  };

  const RemoveFavoriteHandler = () => {
    axios
      .post("http://localhost:5000/api/favorites/remove", {
        userId: user._id,
        bookId: bookID,
      })
      .then((res) => {
        const books = user.favBooks;
        const bookToRemoveIndex = books.indexOf(bookID);
        if (bookToRemoveIndex !== -1) {
          books.splice(bookToRemoveIndex, 1);
        }
        const newUser = user;
        user.favBooks = books;
        dispatch({ type: "UPDATE_BOOKS", payload: newUser });
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: "The book has been removed from your favorite books.",
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <tr>
      <td>
        <img
          className="table-img"
          src={book.image ? book.image.value : CoverNotFound}
          alt={book.bookLabel.value}
        />
      </td>
      <td>{book.bookLabel.value}</td>
      <td>{book.authorLabel.value}</td>
      <td>{book.genreLabel ? book.genreLabel.value : "Unknown"}</td>
      <td>
        <button
          onClick={showDetails}
          className="btn btn-outline-primary w-100 my-1"
        >
          Details
        </button>
        {user &&
          (user.favBooks.includes(bookID) ? (
            <button
              onClick={RemoveFavoriteHandler}
              className="btn btn-outline-danger w-100"
              title="Remove from favorites"
            >
              <i className="bi bi-x-circle"></i>
            </button>
          ) : (
            <button
              onClick={AddToFavoritesHandler}
              className="btn btn-outline-success w-100"
              title="Add to favorites"
            >
              <i className="bi bi-plus-circle"></i>
            </button>
          ))}
      </td>
    </tr>
  );
};

export default TableRow;
