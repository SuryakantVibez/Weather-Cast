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

  //Dynamic backgrounds
  const code = data.current.condition.code;
  const isDay = data.current.is_day;

  let background;

  // Sunny
  if (code === 1000) {
    background = "clear";
  }

  // Cloudy
  else if (
    [
      1003, 1006, 1009, 1012, 1015, 1018, 1021, 1024, 1027, 1030, 1033, 1036,
      1039, 1042, 1045, 1048, 1135, 1147,
    ].includes(code)
  ) {
    background = "cloudy";
  }

  // Rain (includes rain, snow, sleet, thunder, etc.)
  else {
    background = "rainy";
  }

  // Night version
  if (!isDay) {
    background += "Night";
  } else {
    background += "Day";
  }
  document.body.style.opacity = "0";
  document.body.style.filter = "blur(8px)";
  document.body.style.transform = "scale(0.99)";
  setTimeout(() => {
    document.body.style.backgroundImage = `url(media/backgrounds/${background}.png)`;

    document.body.style.opacity = "1";
    document.body.style.filter = "blur(0px)";
    document.body.style.transform = "scale(1)";
  }, 300);
}
