const rain = document.querySelector(".rain");

function randRange(maxNum, minNum) {
  return Math.floor(Math.random(10) * (maxNum - minNum + 1)) + minNum;
}

function createRain() {
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

    console.log(drop.style.left);
    console.log(dropLeft);
  }
}

//rain drop
//drop top
//hit me with your car on the crosswalk

export default createRain;
