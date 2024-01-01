import "./App.css";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import mist from './images/mist.png';

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const toastHandler = (message) => {
    toast.info(message, {
      position: "top-center",
      autoClose: "4000",
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClickrtl: false,
      pauseOnFocusLossdraggablepauseOnHovertheme: false,
      theme: "dark",
    });
  };

  // const [icon, setIcon] = useState("");

  const getWeatherHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f5f221500244cb749828978d7d4e11a7`
      )
      .then((response) => {
        console.log(city)
        setLoading(false);
        // console.log(response.data)
        setWeather(response?.data);
        console.log(response?.response);
        // console.log(data)
      })
      .catch((err) => {
        setLoading(false)
        console.log("Error", err.message);
        if(err?.response?.data?.message === "city not found"){
          // setShowError(true);
          toastHandler("No City Found")
        }
        setWeather(null)
      });
  };

  return (
    <body>
      <div className="head">
        <h2>Weather Forecast</h2>
        <form onSubmit={getWeatherHandler}>
          <input
            type="text"
            placeholder="City Name"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            required
            minLength={3}
            name="city"
          />
          <button type="submit">Get Weather</button>
        </form>
      </div>

      {(weather !== null && loading === true) ||
      (weather === null && loading === true) ? (
        <div className="loader">
          <div class="spinner-grow text-light" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : weather !== null && loading === false ? (
        <div className="boxes">
          <div className="box1">
            <h2>{Math.ceil(weather?.main?.temp - 273.15)}℃</h2>
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
              alt="Icon"
            />
            <h3>{weather?.weather[0].main}</h3>
            <h3>
              Feels Like: {Math.ceil(weather?.main?.feels_like - 273.15)}℃{" "}
            </h3>
          </div>
          <div className="box2">
            <div className="parts">
              <h1>{weather?.name}</h1>
              <h2>
                {weather?.sys?.country}
                <br />
                Min: {Math.ceil(weather?.main?.temp_min - 273.15)}℃
                <br />
                Max: {Math.ceil(weather?.main?.temp_max - 273.15)}℃
              </h2>
            </div>
            <div className="parts">
              <h3>Humidity: {weather?.main?.humidity}%</h3>
            </div>
            <div className="parts">
              <button
                onClick={() => {
                  toastHandler("Option available soon!");
                }}
              >
                View More Details
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <ToastContainer />
    </body>
  );
}

export default App;
