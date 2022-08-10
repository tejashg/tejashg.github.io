import React from "react";
import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  const [city, setCity] = useState(null);
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    if (city == null) return;
    const fetchapi = async () => {
      const url = process.env.REACT_APP_API_URL + `&q=${city}`;
      try {
        const responseinJson = await fetch(url);
        const responseinObject = await responseinJson.json();
        setTemperature(responseinObject.current.temp_c);
      } catch (e) {
        setTemperature(null);
      }
    };
    fetchapi();
  }, [city]);

  const toupper = (city) => {
    if (city == null) return null;
    return city.charAt(0).toUpperCase() + city.slice(1);
  };

  const changedTemperature = (temperature) => {
    if (temperature == null) return null;
    else return temperature + "°C";
  };

  const getDate = () => {
    var d = Date(Date.now());
    var a = d.toString();
    return a;
  };

  return (
    <>
      <div className="container">
        <textarea
          placeholder="Search"
          onChange={(event) => setCity(event.target.value)}
        />
        <div className="heading">
          <i class="fa-solid fa-street-view" />
          <div className="city-name">{toupper(city)}</div>
        </div>
        <div className="temperature">{changedTemperature(temperature)}</div>
        <div className="date">{getDate()}</div>
        <div className="credits">
          Made with <i className="fa-solid fa-heart" /> by Tejash Gupta
        </div>
      </div>
    </>
  );
};

export default App;
