import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CoverNotFound from "../../assets/CoverNotFound.png";
import { AuthContext } from "../../context/AuthContext";
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
        alert(`Book ${bookID} added to favorites`);
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
        console.log(res.data);
        const books = user.favBooks;
        const bookToRemoveIndex = books.indexOf(bookID);
        console.log(bookToRemoveIndex);
        console.log(books);
        if (bookToRemoveIndex !== -1) {
          books.splice(bookToRemoveIndex, 1);
        } 
        console.log(books);
        const newUser = user;
        user.favBooks = books;
        dispatch({ type: "UPDATE_BOOKS", payload: newUser });
        alert(`Book ${bookID} removed from favorites.`);
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
              className="btn btn-outline-danger"
            >
              Remove from favorites
            </button>
          ) : (
            <button
              onClick={AddToFavoritesHandler}
              className="btn btn-outline-success w-100"
            >
              Add to favorites
            </button>
          ))}
      </td>
    </tr>
  );
};

export default TableRow;
