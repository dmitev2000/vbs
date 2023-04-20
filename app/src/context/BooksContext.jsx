import { createContext, useState } from "react";

const BookContext = createContext({
  books: [],
  updateBooks: (newList) => {},
});

export const BooksContextProvider = (props) => {
  const [books, setBooks] = useState(JSON.parse(localStorage.getItem("books")) || null);

  const updateBooks = (newList) => {
    setBooks(() => newList);
    localStorage.setItem("books", JSON.stringify(newList));
  };

  const context = {
    books: books,
    updateBooks: updateBooks,
  };

  return (
    <BookContext.Provider value={context}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContext;