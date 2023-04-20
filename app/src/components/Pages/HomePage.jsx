import React from "react";
import books_background from "../../assets/books_background_v2.jpg";

const HomePage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${books_background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="py-5 page d-flex justify-content-center align-items-center flex-column text-center text-light"
    >
      <div className="intro-wrapper">
        <h1>
          Open the Door to Endless Worlds of Knowledge with Wiki Books
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
