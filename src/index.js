import "./styles.css";
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const centerDiv = document.querySelector(".center-part");
const bottomDiv = document.querySelector(".bottom-part-div");
const city = document.querySelector("#city");
const weatherIcon = document.querySelector(".weather-icon");
const temp = document.querySelector("#temperature");
const humidityValue = document.querySelector("#humidity-value");
const windValue = document.querySelector("#wind-value");
const toggleBtn = document.querySelector(".toggle-btn");
const loading = document.querySelector("#loading");
const errorMessage = document.createElement("p");
const weatherDataDiv = document.querySelector(".weather-data");

async function getWeatherData() {
  try {
    const cityValue = searchInput.value;
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityValue}?unitGroup=us&key=UXA9C2SB49MAYTRTEM4T9ZVBV&contentType=json`
    );
    const weatherData = await response.json();
    errorMessage.style.display = "none";
    loading.style.display = "none";
    centerDiv.style.display = "flex";
    bottomDiv.style.display = "flex";
    toggleBtn.style.display = "block";
    const imageURL = await import(`./images/${weatherData.days[0].icon}.png`);
    weatherIcon.src = imageURL.default;
    city.textContent = weatherData.address;
    temp.textContent = `${weatherData.days[0].temp}°F`;
    temp.dataset.fahrenheit = weatherData.days[0].temp;
    humidityValue.textContent = `${weatherData.days[0].humidity}%`;
    windValue.textContent = `${(
      weatherData.days[0].windspeed * 1.60934
    ).toFixed(2)} km/hr`;
  } catch (e) {
    errorMessage.style.display = "block";
    errorMessage.classList.add("error-message");
    errorMessage.textContent = "City not found or network error.";
    errorMessage.style.color = "red";
    weatherDataDiv.append(errorMessage);
    loading.style.display = "none";
    centerDiv.style.display = "none";
    bottomDiv.style.display = "none";
    toggleBtn.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  loading.style.display = "block";
  toggleBtn.textContent = "°C";
  centerDiv.style.display = "none";
  bottomDiv.style.display = "none";
  toggleBtn.style.display = "none";
  errorMessage.style.display = "none";
  getWeatherData();
});

toggleBtn.addEventListener("click", (e) => {
  if (e.target.textContent === "°C") {
    const fahrenheit = parseFloat(temp.dataset.fahrenheit);
    const celcius = (((fahrenheit - 32) * 5) / 9).toFixed(2);
    temp.innerText = `${celcius}°C`;
    e.target.textContent = "°F";
  } else {
    temp.innerText = `${temp.dataset.fahrenheit}°F`;
    e.target.textContent = "°C";
  }
});
