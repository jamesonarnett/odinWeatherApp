import createRain from "./rain";

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

export {
  loadingIcon,
  rainCheck,
  unixTimeConverter,
  kelvinToF,
  deleteBody,
  addErrorMsg,
  removeErrorMsg,
};
