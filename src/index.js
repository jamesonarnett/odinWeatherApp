//Globals
const cityInput = document.getElementById("cityInput");
const errorMsg = document.getElementById("errorMsg");

//utility functions
const removeErrorMsg = () => {
  errorMsg.classList.add("hidden");
};

const addErrorMsg = () => {
  errorMsg.classList.remove("hidden");
};

const deleteBody = () => {
  let body = document.getElementById("bodyCard");
  let weekCard = document.getElementById("weekCard");
  body.textContent = "";
  weekCard.textContent = "";
};

const kelvinToF = (k) => {
  return (((k - 273.15) * 9) / 5 + 32).toFixed(1);
};

const unixTimeConverter = (date) => {
  let a = new Date(date * 1000);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let dateMonth = months[a.getMonth()];
  let dateNum = a.getDate();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[a.getDay()];
  return `${day} <br /> ${dateMonth}-${dateNum}`;
};

const rainCheck = (item) => {
  if (item.rain > 0) {
    return `${(item.rain * 0.0393701).toFixed(2)} inches`;
  } else {
    return `0% Chance`;
  }
};

const loadingIcon = () => {
  const loader = document.querySelector(".loading");
  loader.classList.add("display");

  setTimeout(() => {
    loader.classList.remove("display");
  }, 1000);
};

//end utility functions

//Controller-esque form
const searchForm = document
  .getElementById("form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    removeErrorMsg();
    deleteBody();
    getWeatherCity();
    cityInput.value = "";
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getWeatherCity = () => {
  loadingIcon();

  const queryName = cityInput.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${queryName}&appid=${"59fd5a052fb83eda97d09b3f2f02dde7"}`
  )
    .then((data) => data.json())
    .then((weather) => {
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
      console.log(weather);
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

const createWeatherCard = (weather) => {
  let bodyCard = document.getElementById("bodyCard");

  let temp = kelvinToF(weather.main.temp);
  if (temp >= 70) {
    body.style.backgroundImage = `url("./assets/sun.webp")`;
  } else {
    body.style.backgroundImage = `url("./assets/background.png")`;
  }

  const html = `

        <div class="weatherCardL">
          <img class="weatherIcon" src="http://openweathermap.org/img/wn/${
            weather.weather[0].icon
          }@2x.png" />
              <h4>${weather.name}</h4>
              <p>${new Date().toLocaleDateString()}</p>
              <h1>${temp}F</h1>
              <h3>${weather.weather[0].description}</h3>
            
        </div>
        <div class="weatherCardR">
          <p>Cloud Coverage: ${weather.clouds.all}%</p>
          <p>Humidity: ${weather.main.humidity}%</p>
          <p>Wind: ${weather.wind.speed}mph</p>
          <p class="weekRain">Precipitation: <br />${rainCheck(weather)}</p>
          <img class="weatherIcon" src="http://openweathermap.org/img/wn/${
            weather.weather[0].icon
          }@2x.png" />
        </div>
    
    `;

  bodyCard.insertAdjacentHTML("beforeend", html);
};

const createWeatherWeekCard = (weather) => {
  let weekCard = document.getElementById("weekCard");

  weather.forEach((item) => {
    const html = `
    <div class="dayCard">
    <h2>${unixTimeConverter(item.dt)}</h2>
    <img class="weatherIcon" src="http://openweathermap.org/img/wn/${
      item.weather[0].icon
    }@2x.png" />
    <p class="weekRain">Precipitation: <br />${rainCheck(item)}</p>
    <p class="weekHigh">High: ${kelvinToF(item.temp.max)}F</p>
    <p class="weekLow">Low: ${kelvinToF(item.temp.min)}F</p>
    </div>
    `;

    weekCard.insertAdjacentHTML("beforeend", html);
  });
};

// mobile first
// rainy animations/more background changes
// form validation... even needed?
// refactor
// webpack???
