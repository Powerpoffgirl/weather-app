import React, { useEffect, useState } from "react";
import "./WeatherData.css";
import { CELCIUS, FAHRENHEIT } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";

const WeatherData = () => {
  const key = "ba10556bff424261b6940555230403";
  const { city } = useParams();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [weatherData, setWeatherData] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [tempUnit, setTempUnit] = useState("C");

  const fetchWeatherData = async () => {
    setIsFetching(true);
    try {
      axios
        .get(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`)
        .then((response) => {
          console.log(response.data);
          setWeatherData(response.data);
          setIsFetching(false);
          window.localStorage.setItem("Celcius", response.data.current.temp_c);
          window.localStorage.setItem(
            "Farheinheit",
            response.data.current.temp_f
          );
          dispatch({
            type: CELCIUS,
            celciusValue: response.data.current.temp_c,
          });
          dispatch({
            type: FAHRENHEIT,
            farhenheitValue: response.data.current.temp_f,
          });
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    if (store.celciusValue === 0) {
      dispatch({
        type: CELCIUS,
        celciusValue: localStorage.getItem("Celcius"),
      });
      dispatch({
        type: FAHRENHEIT,
        farhenheitValue: localStorage.getItem("Farheinheit"),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) {
    return (
      <div>
        <Spinner size="10vw" />
      </div>
    );
  }
  const handleTemperature = (e) => {
    console.log(e.target.value);
    setTempUnit(e.target.value);
  };

  return (
    <div className="weatherData">
      <h1 className="weatherHeading">Weather Data</h1>
      <form className="changeTemperatureUnit">
        <input
          type="radio"
          id="Celcius"
          value="Celcius"
          onClick={handleTemperature}
        />
        <label htmlFor="Celcius">Celcius</label>

        <input
          type="radio"
          id="Farheinheit"
          value="Farheinheit"
          onClick={handleTemperature}
        />
        <label htmlFor="Farheinheit">Farheinheit</label>
      </form>

      <div className="resultConatiner">
        <p>Location: {weatherData.location.name}</p>
        <p>
          Temperature:{" "}
          {tempUnit === "Celcius" ? store.celciusValue : store.farhenheitValue}
        </p>
        <img
          className="weatherImg"
          src={weatherData.current.condition.icon}
          alt="weatherImg"
        />
        <p>Weather Condition: {weatherData.current.condition.text}</p>
      </div>
    </div>
  );
};

export default WeatherData;
