let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=933be53a5aea4413546fcc7271d55ca3&units=metric`;
let apiWKey = "933be53a5aea4413546fcc7271d55ca3";

const cityChosen = async (city) => {
  let searchInput = document.querySelector("#searchInput");
  let h1city = document.querySelector("#city");
  let country = document.querySelector("#country");
  let imageDiv = document.querySelector("#imageDiv");
  let temp = document.querySelector("#temp");
  let wind = document.querySelector("#wind");
  let humid = document.querySelector("#humid");
  let weatherDiv = document.querySelector("#weatherDiv");
  if (
    !searchInput ||
    !h1city ||
    !country ||
    !imageDiv ||
    !temp ||
    !wind ||
    !humid ||
    !weatherDiv
  ) {
    console.log("error");
    return;
  }
  try {
    let data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=933be53a5aea4413546fcc7271d55ca3&units=metric`
    );
    let newData = await data.json();
    console.log("data", newData);
    h1city.innerHTML = newData.name;
    if (newData.name == undefined) {
      let popup = document.querySelector("#popup");
      popup.style.display = "block";
      popup.innerHTML = `oops...couldn't find ${city} city`;
      h1city.innerHTML = "";
      setTimeout(() => {
        popup.style.display = "none";
      }, 2500);
    }
    country.innerHTML = newData.sys.country;
    imageDiv.src = `https://openweathermap.org/img/wn/${newData.weather[0].icon}.png`;
    weatherDiv.innerHTML = newData.weather[0].description;
    temp.innerHTML = `${Math.ceil(newData.main.temp)} &#8451;`;
    if (newData.main.temp < 25) {
      temp.style.color = "blue";
    } else if (newData.main.temp >= 25 && newData.main.temp <= 30) {
      temp.style.color = "goldenrod";
    } else if (newData.main.temp > 30) {
      temp.style.color = "red";
    }
    wind.innerHTML = `Wind: ${newData.wind.speed} m/s`;
    humid.innerHTML = `Humidity: ${newData.main.humidity}%`;
  } catch {
    console.log("fetch error");
  }
};
window.addEventListener("load", () => {
  let searchBtn = document.querySelector("#searchBtn");

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      let { value: searchInput } = document.querySelector("#searchInput");
      cityChosen(searchInput);
    });
  }
});
