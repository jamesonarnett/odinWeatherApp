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

const randRange = (maxNum, minNum) => {
  return Math.floor(Math.random(10) * (maxNum - minNum + 1)) + minNum;
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

const loadingIcon = () => {
  const loader = document.querySelector(".loading");
  loader.classList.add("display");

  setTimeout(() => {
    loader.classList.remove("display");
  }, 1000);
};

export {
  loadingIcon,
  unixTimeConverter,
  kelvinToF,
  deleteBody,
  addErrorMsg,
  removeErrorMsg,
  randRange,
};
