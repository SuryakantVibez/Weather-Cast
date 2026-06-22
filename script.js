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

// Fetching from API

async function getWeather(locationName) {
  const response = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=" +
      api +
      "&q=" +
      locationName +
      "&aqi=yes",
  );

  const data = await response.json();

  console.log(data);
  console.log(" ");
  console.log(response);
}
