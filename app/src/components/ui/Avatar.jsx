import React from "react";

const Avatar = ({ image, label }) => {
  return (
    <div className="avatar">
      <img className="avatar-img" src={image} alt={label} />
      <p className="text-muted">{label}</p>
    </div>
  );
};

export default Avatar;
