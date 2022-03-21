import { kelvinToF, unixTimeConverter } from "./utils";
import { rainCheck } from "./rain";

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

export { createWeatherCard, createWeatherWeekCard };
