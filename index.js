const cityInput = document.getElementById("cityInput");

const deleteBody = () => {
  let body = document.getElementById("bodyCard");
  body.remove();
};

const searchForm = document
  .getElementById("form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    deleteBody();
    getWeatherCity();
    cityInput.value = "";
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getWeatherCity = () => {
  const queryName = cityInput.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${queryName}&appid=}`
  )
    .then((data) => data.json())
    .then((weather) => {
      console.log(weather);
      createWeatherCard(weather);
      getWeatherWeekForecast(weather.coord.lat, weather.coord.lon);
    });
};

const getWeatherWeekForecast = (lat, lon) => {
  console.log(lat, lon);
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=}`
  )
    .then((data) => data.json())
    .then((weather) => {
      console.log(weather);
      let days = weather.daily;
      createWeatherWeekCard(days);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getWeatherGeo = (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=`
  )
    .then((data) => data.json())
    .then((weather) => {
      console.log(weather);
      createWeatherCard(weather);
    });
};

navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  getWeatherGeo(lat, lon);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const kelvinToF = (k) => {
  return (((k - 273.15) * 9) / 5 + 32).toFixed(1);
};

const createWeatherCard = (weather) => {
  let body = document.getElementById("body");

  let temp = kelvinToF(weather.main.temp);
  if (temp >= 70) {
    body.style.backgroundImage = `url("./assets/sun.webp")`;
  } else {
    body.style.backgroundImage = `url("./assets/background.png")`;
  }

  const html = `
  <div id="bodyCard" class="weatherCardWhole">
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
        
        </div>
    </div> 
    `;

  body.insertAdjacentHTML("afterend", html);
};

const createWeatherWeekCard = (weather) => {
  weather.forEach((item) => {
    const html = `
    <div class="dayCard">
    
    </div>
    `;
  });

  // Create this div in the HTML markup. Then i should add each item to this div.
  // const html = `
  // <div class="weatherWeekCard">

  // </div>
  //`
};
