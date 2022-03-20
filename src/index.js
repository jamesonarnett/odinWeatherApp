import "./scss/rain.scss";
import {
  createWeatherCard,
  createWeatherWeekCard,
} from "./modules/weatherCards";

import {
  loadingIcon,
  removeErrorMsg,
  addErrorMsg,
  deleteBody,
} from "./modules/utils";

import { createRain, stopRain } from "./modules/rain";

//Controller-esque form
const searchForm = document
  .getElementById("form")
  .addEventListener("submit", (e) => {
    const cityInput = document.getElementById("cityInput");
    e.preventDefault();
    removeErrorMsg();
    deleteBody();
    stopRain();
    getWeatherCity();
    cityInput.value = "";
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getWeatherCity = () => {
  const cityInput = document.getElementById("cityInput");
  loadingIcon();

  const queryName = cityInput.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${queryName}&appid=${"59fd5a052fb83eda97d09b3f2f02dde7"}`
  )
    .then((data) => data.json())
    .then((weather) => {
      if (weather.rain || weather.snow) {
        createRain();
      }

      createWeatherCard(weather);
      getWeatherWeekForecast(weather.coord.lat, weather.coord.lon);
    })
    .catch(() => {
      addErrorMsg();
      throw new Error("The city you entered is not valid");
    });
};

const getWeatherWeekForecast = (lat, lon) => {
  loadingIcon();
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${"59fd5a052fb83eda97d09b3f2f02dde7"}`
  )
    .then((data) => data.json())
    .then((weather) => {
      let days = weather.daily;
      createWeatherWeekCard(days);
    })
    .catch((err) => {
      console.log(err);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getWeatherGeo = (lat, lon) => {
  loadingIcon();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${"59fd5a052fb83eda97d09b3f2f02dde7"}`
  )
    .then((data) => data.json())
    .then((weather) => {
      createWeatherCard(weather);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Geolocation on load.
navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  getWeatherGeo(lat, lon);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// mobile first
// rainy animations/more background changes
// form validation... even needed?
// refactor
