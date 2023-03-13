import React from "react";
import { Link } from "react-router-dom";

const Info = ({ notableWork }) => {
  return (
    <div>
      <h3>Notable work</h3>
      <ul>
        {notableWork.map((work, index) => {
            const pathSplit = work.notableWork.value.split("/");
            const path = pathSplit[pathSplit.length - 1];
            return <li key={index}>
                <Link to={`/books/${path}`}>{work.notableWorkLabel.value}</Link>
            </li>
        })}
      </ul>
    </div>
  );
};

export default Info;
