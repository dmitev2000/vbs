import React from "react";

const Info = ({ author, education }) => {
  console.log(author);
  return (
    <div>
      <h3 className="mb-3">Info</h3>
      <p>
        Name: <b>{author.nameLabel.value}</b>
      </p>
      <p>
        {author.birthPlaceLabel && author.birthPlaceLabel.value ? (
          <>
            Born:{" "}
            <b>
              {new Date(author.birthDate.value).toString().substring(4, 15)}
            </b>{" "}
            in {author.birthPlaceLabel.value}
          </>
        ) : (
          ""
        )}
      </p>
      {author.deathDate && (
        <p>
          {author.deathPlaceLabel && author.deathDate.value ? (
            <>
              Died:{" "}
              <b>
                {new Date(author.deathDate.value).toString().substring(4, 15)}
              </b>{" "}
              in {author.deathPlaceLabel.value}
            </>
          ) : (
            ""
          )}
        </p>
      )}
      {author.lastWords && (
        <p>
          Last words:{" "}
          <span className="fst-italic">,,{author.lastWords.value}"</span>
        </p>
      )}
      {education && education.length !== 0 && (
        <>
          <p>Education:</p>
          <ul>
            {education.map((e, i) => {
              return <li key={i}>{e.educatedAtLabel.value}</li>;
            })}
          </ul>
        </>
      )}
      {author.movementLabel && <p>Movement: {author.movementLabel.value}</p>}
    </div>
  );
};

export default Info;
