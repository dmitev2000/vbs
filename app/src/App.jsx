import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Loader from './components/Loader/Loader';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/fetch/")
      .then((res) => {
        //console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="container py-5">
        <h1>Available books: </h1>
        <div>
          <table id="table" className="table table-bordered">
            <thead>
              <tr>
                <th>Book title</th>
                <th>Author</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {data.map((book, index) => {
                return (
                  <tr key={index}>
                    <td>{book.bookLabel.value}</td>
                    <td>{book.authorLabel.value}</td>
                    <td>
                      {book.countryLabel ? book.countryLabel.value : "Unknown"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
