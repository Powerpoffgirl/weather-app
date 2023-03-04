import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleClick = () => {
    if (city !== "") {
      navigate(`/weather/${city}`);
    } else {
      alert("input feild empty");
    }
  };
  return (
    <div className="home">
      <div className="heading">
        <h1>Weather Api</h1>
      </div>
      <div className="searchContainer">
        <input
          className="searchText"
          type="text"
          placeholder="Location"
          value={city}
          onChange={handleChange}
        />
        <button className="searchButton" onClick={handleClick}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Home;
