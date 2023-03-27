import React from "react";
import home_bg from "../../assets/home_bg_darker.svg";

const HomePage = () => {
  return (
    <div
      style={{ backgroundImage: `url(${home_bg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
      className="py-5 page d-flex justify-content-center align-items-center flex-column text-center text-light"
    >
      <h1 style={{ maxWidth: "500px" }}>
        Open the Door to Endless Worlds of Knowledge with Wiki Books
      </h1>
      <lord-icon
        src="https://cdn.lordicon.com/ttioogfl.json"
        trigger="boomerang"
        delay="0"
        style={{ width: "250px", height: "250px" }}
      ></lord-icon>
    </div>
  );
};

export default HomePage;
