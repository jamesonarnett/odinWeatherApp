const rain = document.querySelector(".rain");

const randRange = (maxNum, minNum) => {
  return Math.floor(Math.random(10) * (maxNum - minNum + 1)) + minNum;
};

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
  rain.innerHTML = "";
};

// const isRaining = (precipitation = 0, snow = 0) => {
//   if (precipitation > 0 || snow > 0) {
//     createRain();
//   }
// };

//rain drop
//drop top
//hit me with your car on the crosswalk

export { createRain, stopRain };

//should make snow animation different.....
