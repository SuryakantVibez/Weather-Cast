//Temp Fullscreen function

// document.querySelector(".searchSubmitBtn").addEventListener("click", () => {
//   document.documentElement.requestFullscreen();
// });

// Searching location

const searchBar = document.querySelector("#locationInput");

document.querySelector(".searchSubmitBtn").onclick = () => {
  const locationName = searchBar.value;
  searchBar.value = null;
  console.log(locationName);
  getWeather(locationName);
};

const api = "964aefc45f084abf97c30437262105";

// Fetch and Update data

// Fetch
async function getWeather(locationName) {
  const response = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=" +
      api +
      "&q=" +
      locationName +
      "&aqi=no",
  );

  const data = await response.json();
  console.log(data);

  // Update

  document.querySelector(".tempText").textContent =
    Math.round(data.current.temp_c) + "°C";
  document.querySelector(".condition").textContent =
    data.current.condition.text;
  document.querySelector(".cityLocation").textContent =
    data.location.name + ", " + data.location.region;
  document.querySelector(".windDirection").textContent = data.current.wind_dir;
  document.querySelector(".windDegree").textContent = data.current.wind_degree;

  //Time wizardary

  document.querySelector("#localTime").textContent = new Date(
    data.location.localtime.replace(" ", "T"),
  ).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Humidity

  document.querySelector(".humidity").textContent = data.current.humidity + "%";
  if (data.current.humidity <= 33) {
    locationHumidity = "Low";
  } else if (data.current.humidity >= 34 && data.current.humidity <= 66) {
    locationHumidity = "Medium";
  } else if (data.current.humidity > 66) {
    locationHumidity = "High";
  }
  document.querySelector(".humidityState").textContent = locationHumidity;
}
