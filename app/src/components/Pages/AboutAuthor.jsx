import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import Avatar from "../ui/Avatar";
import NotableWork from "../ui/NotableWork";
import Info from "../ui/Info";
import Occupations from "../ui/Occupations";

const AboutAuthor = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [aboutAuthor, setAboutAuthor] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/authors/", { id: id })
      .then((res) => {
        console.log(res.data);
        setAboutAuthor(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <div className="page-loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container page py-5">
      <h1 className="mb-5">About {aboutAuthor.author[0].nameLabel.value} ({id && id})</h1>
      <div className="d-flex justify-content-evenly align-items-start flex-wrap a-details">
        <Avatar
          image={aboutAuthor.author[0].image.value}
          label={aboutAuthor.author[0].nameLabel.value}
        />
        <Info author={aboutAuthor.author[0]} education={aboutAuthor.education} />
        <Occupations occupations={aboutAuthor.occupations} />
        <NotableWork notableWork={aboutAuthor.notableWork} />
      </div>
    </div>
  );
};

export default AboutAuthor;
