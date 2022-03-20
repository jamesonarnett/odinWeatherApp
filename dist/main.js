(()=>{const e=document.getElementById("cityInput"),t=document.getElementById("errorMsg"),n=e=>(9*(e-273.15)/5+32).toFixed(1),a=e=>e.rain>0?`${(.0393701*e.rain).toFixed(2)} inches`:"0% Chance",o=()=>{const e=document.querySelector(".loading");e.classList.add("display"),setTimeout((()=>{e.classList.remove("display")}),1e3)},d=(document.getElementById("form").addEventListener("submit",(n=>{n.preventDefault(),t.classList.add("hidden"),(()=>{let e=document.getElementById("bodyCard"),t=document.getElementById("weekCard");e.textContent="",t.textContent=""})(),d(),e.value=""})),()=>{o();const n=e.value;fetch(`https://api.openweathermap.org/data/2.5/weather?q=${n}&appid=59fd5a052fb83eda97d09b3f2f02dde7`).then((e=>e.json())).then((e=>{s(e),r(e.coord.lat,e.coord.lon)})).catch((()=>{throw t.classList.remove("hidden"),new Error("The city you entered is not valid")}))}),r=(e,t)=>{o(),fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${e}&lon=${t}&exclude=minutely,hourly&appid=59fd5a052fb83eda97d09b3f2f02dde7`).then((e=>e.json())).then((e=>{console.log(e);let t=e.daily;i(t)})).catch((e=>{console.log(e)}))};navigator.geolocation.getCurrentPosition((e=>{var t,n;t=e.coords.latitude,n=e.coords.longitude,o(),fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=59fd5a052fb83eda97d09b3f2f02dde7`).then((e=>e.json())).then((e=>{s(e)})).catch((e=>{console.log(e)}))}));const s=e=>{let t=document.getElementById("bodyCard"),o=n(e.main.temp);body.style.backgroundImage=o>=70?'url("./assets/sun.webp")':'url("./assets/background.png")';const d=`\n\n        <div class="weatherCardL">\n          <img class="weatherIcon" src="http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png" />\n              <h4>${e.name}</h4>\n              <p>${(new Date).toLocaleDateString()}</p>\n              <h1>${o}F</h1>\n              <h3>${e.weather[0].description}</h3>\n            \n        </div>\n        <div class="weatherCardR">\n          <p>Cloud Coverage: ${e.clouds.all}%</p>\n          <p>Humidity: ${e.main.humidity}%</p>\n          <p>Wind: ${e.wind.speed}mph</p>\n          <p class="weekRain">Precipitation: <br />${a(e)}</p>\n          <img class="weatherIcon" src="http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png" />\n        </div>\n    \n    `;t.insertAdjacentHTML("beforeend",d)},i=e=>{let t=document.getElementById("weekCard");e.forEach((e=>{const o=`\n    <div class="dayCard">\n    <h2>${(e=>{let t=new Date(1e3*e),n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],a=t.getDate();return`${["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"][t.getDay()]} <br /> ${n}-${a}`})(e.dt)}</h2>\n    <img class="weatherIcon" src="http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png" />\n    <p class="weekRain">Precipitation: <br />${a(e)}</p>\n    <p class="weekHigh">High: ${n(e.temp.max)}F</p>\n    <p class="weekLow">Low: ${n(e.temp.min)}F</p>\n    </div>\n    `;t.insertAdjacentHTML("beforeend",o)}))}})();