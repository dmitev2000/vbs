import React from "react";

const HomePage = () => {
  return (
    <div className="container py-5 page d-flex justify-content-center align-items-center flex-column text-center">
      <h1 style={{maxWidth: "500px"}}>Open the Door to Endless Worlds of Knowledge with Wiki Books</h1>
      <lord-icon
        src="https://cdn.lordicon.com/dxoycpzg.json"
        trigger="loop"
        delay="1000"
        style={{ width: "250px", height: "250px" }}
      ></lord-icon>
    </div>
  );
};

export default HomePage;
