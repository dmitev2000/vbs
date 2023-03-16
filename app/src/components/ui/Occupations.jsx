import React from "react";

const Occupations = ({ occupations }) => {
  return (
    <div>
      <h3 className="mb-3">Occupations</h3>
      {occupations && (
        <ul>
          {occupations.map((occupation, index) => {
            return <li key={index}>{occupation.occupationLabel.value}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default Occupations;
