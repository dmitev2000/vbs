import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/fetch/")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Available books: </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {data.map((book, index) => {
          return (
            <div key={index} className="book">
              <img
                src={
                  book.image
                    ? book.image.value
                    : "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg"
                }
                alt=""
              />
              <div>
                <h3>{book.bookLabel.value}</h3>
                <a href={book.author.value}>{book.authorLabel.value}</a>
                <br />
                <a href={book.book.value}>More info</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
