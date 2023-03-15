import React, { useEffect } from "react";
import TableRow from "./TableRow";
import DataTable from "datatables.net-dt";

const DataTableComponent = ({ books }) => {
  useEffect(() => {
    const aa = {
      language:{
        searchPlaceholder: "Book title, Author, Genre"
      }
    }
    new DataTable("#table", aa);
  }, []);

  return (
    <table id="table" className="table table-bordered table-striped">
      <thead className="table-dark">
        <tr>
          <th>Book cover</th>
          <th>Book title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => {
          return <TableRow book={book} key={index} />;
        })}
      </tbody>
    </table>
  );
};

export default DataTableComponent;
