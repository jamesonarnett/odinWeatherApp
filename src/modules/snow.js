import { randRange } from "./utils";

//use existing rain div for snow animation
const rain = document.querySelector(".rain");

const createSnow = () => {
  const numberOfDrops = 800;
  for (let i = 0; i < numberOfDrops; i++) {
    const dropLeft = randRange(0, 3000);
    const dropTop = randRange(-1000, 1000);
    rain.insertAdjacentHTML(
      "afterbegin",
      '<div class="snowflake" id=' + i + "></div>"
    );
    let drop = document.querySelector(".snowflake");
    drop.style.left = `${dropLeft}px`;
    drop.style.top = `${dropTop}px`;
  }
};

const stopSnow = () => {
  let body = document.getElementById("body");
  rain.innerHTML = "";
  body.style.backgroundImage = `url("")`;
};

const snowCheck = (item) => {
  if (item.snow > 0) {
    return `${(item.snow * 0.0393701).toFixed(2)} inches`;
  } else {
    return `0% Chance`;
  }
};

const isSnowing = (weather) => {
  let body = document.getElementById("body");

  if (weather.daily[0].snow > 0) {
    body.style.backgroundImage = `url("./assets/snow.webp")`;
    createSnow();
  }
};

export { createSnow, stopSnow, isSnowing, snowCheck };
