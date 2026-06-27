// Automatic weather fetching

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function start() {
  try {
    const position = await getLocation();

    const locationName = `${position.coords.latitude},${position.coords.longitude}`;

    getWeather(locationName);
  } catch (err) {
    console.log("Location permission denied.");
    getWeather("Noida"); // Fallback
  }
}

start();

// Searching location

const searchBar = document.querySelector("#locationInput");

document.querySelector(".searchSubmitBtn").onclick = () => {
  locationName = searchBar.value;
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
  document.querySelector(".windDegree").textContent =
    data.current.wind_degree + "°";
  console.log(data.current.wind_degree);
  document.querySelector("img").style.rotate =
    data.current.wind_degree + 180 + "deg";

  //Time wizardary, please forgive me, i didn't know how, i had to copy from chatgpt :prayEmojiSupposedToBeHere(notReally)

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

  const astroResponse = await fetch(
    "https://api.weatherapi.com/v1/astronomy.json?key=" +
      api +
      "&q=" +
      locationName +
      "&aqi=no",
  );

  const astroData = await astroResponse.json();
  console.log(astroData);

  document.querySelector("#rise").textContent =
    astroData.astronomy.astro.sunrise;
  document.querySelector("#set").textContent = astroData.astronomy.astro.sunset;
}
