const getWeather = (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${"59fd5a052fb83eda97d09b3f2f02dde7"}`
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
  getWeather(lat, lon);
});

const kelvinToF = (k) => {
  return (((k - 273.15) * 9) / 5 + 32).toFixed(1);
};

const createWeatherCard = (weather) => {
  let body = document.getElementById("body");

  let temp = kelvinToF(weather.main.temp);

  const html = `
  <div class="weatherCardWhole">
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

  console.log(weather.rain);
  body.insertAdjacentHTML("afterend", html);
};
