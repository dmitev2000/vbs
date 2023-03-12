import React from "react";
import { useNavigate } from "react-router-dom";

const TableRow = ({ book }) => {
  const navigate = useNavigate();

  const showDetails = () => {
    const split = book.book.value.split("/");
    const bookID = split[split.length - 1];
    //console.log(bookID);
    navigate(`/books/${bookID}`);
  };

  return (
    <tr>
      <td>{book.bookLabel.value}</td>
      <td>{book.authorLabel.value}</td>
      <td>{book.countryLabel ? book.countryLabel.value : "Unknown"}</td>
      <td>
        <button
          onClick={showDetails}
          className="btn btn-outline-primary w-100 my-1"
        >
          Details
        </button>
        <button className="btn btn-outline-success w-100">
          Add to favorites
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
