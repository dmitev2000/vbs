import React from "react";
import { useParams } from "react-router-dom";

const GenreDetails = () => {
  const { id } = useParams();

  return (
    <div className="container py-5 page">
      <h1 className="mb-5">Genre Details {id && id}</h1>
    </div>
  );
};

export default GenreDetails;
