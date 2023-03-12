import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import NotFound from "./components/Pages/NotFound";
import MyFavoriteBooks from "./components/Pages/MyFavoriteBooks";
import FetchBooks from "./components/Pages/FetchBooks";
import BookDetails from "./components/Pages/BookDetails";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/books" element={<FetchBooks />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/favorites" element={<MyFavoriteBooks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
