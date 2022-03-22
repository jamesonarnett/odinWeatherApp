import { randRange } from "./utils";

const rain = document.querySelector(".rain");

const createRain = () => {
  const numberOfDrops = 800;
  for (let i = 0; i < numberOfDrops; i++) {
    const dropLeft = randRange(0, 3000);
    const dropTop = randRange(-1000, 1000);
    rain.insertAdjacentHTML(
      "afterbegin",
      '<div class="drop" id=' + i + "></div>"
    );
    let drop = document.querySelector(".drop");
    drop.style.left = `${dropLeft}px`;
    drop.style.top = `${dropTop}px`;
  }
};

const stopRain = () => {
  let body = document.getElementById("body");
  rain.innerHTML = "";
  body.style.backgroundImage = `url("")`;
};

const rainCheck = (item) => {
  if (item.rain > 0) {
    return `${(item.rain * 0.0393701).toFixed(2)} inches`;
  } else {
    return `0% Chance`;
  }
};

const isRaining = (weather) => {
  let body = document.getElementById("body");

  if (weather.daily[0].rain > 0) {
    body.style.backgroundImage = `url("./assets/rain.jpg")`;
    createRain();
  }
};

//rain drop
//drop top
//hit me with your car on the crosswalk

export { createRain, stopRain, isRaining, rainCheck };
