import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import NotFound from "./components/Pages/NotFound";
import MyFavoriteBooks from "./components/Pages/MyFavoriteBooks";
import FetchBooks from "./components/Pages/FetchBooks";
import BookDetails from "./components/Pages/BookDetails";
import AboutAuthor from "./components/Pages/AboutAuthor";
import Register from "./components/Pages/Register";
import Login from "./components/Pages/Login";
import "./App.css";
import GenreDetails from "./components/Pages/GenreDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<FetchBooks />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/favorites" element={<MyFavoriteBooks />} />
        <Route path="/authors/:id" element={<AboutAuthor />} />
        <Route path="/genres/:id" element={<GenreDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
