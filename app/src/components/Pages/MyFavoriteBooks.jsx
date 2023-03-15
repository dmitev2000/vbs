import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyFavoriteBooks = () => {
  const authCtx = useContext(AuthContext);
  const { user } = authCtx;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container py-5 page">
      <h1>My Favorite Books</h1>
      {user.favBooks.length === 0 ? (
        <p className="text-muted">You don't have any favorites yet.</p>
      ) : (
        <ol>
          {user.favBooks.map((book, index) => {
            return <li key={index}>{book}</li>;
          })}
        </ol>
      )}
    </div>
  );
};

export default MyFavoriteBooks;
