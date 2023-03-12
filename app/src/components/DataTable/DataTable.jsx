import React from "react";
import TableRow from "./TableRow";

const DataTable = ({ books }) => {
  return (
    <table id="table" className="table table-bordered table-responsive">
      <thead className="table-dark">
        <tr>
          <th>Book title</th>
          <th>Author</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => {
          return (
            <TableRow book={book} key={index} />
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
