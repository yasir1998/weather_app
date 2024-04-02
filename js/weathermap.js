// const apiKey = `2d6c1e33729c49f79fd105616240602`; //from weather api
const apiKey = `f0e283a322a9dcb3a6212655df6ca399`;
const searchButton = document.querySelector(".search-btn");
const locationBtn = document.querySelector(".location-btn");
const cityInput = document.querySelector(".cityInput");
const countryInput = document.querySelector(".country");
const weatherCardDiv = document.querySelector(".weather-cards");
const currentWeatherDiv = document.querySelector(".current-weather");

const createWeatherCard = (cityName, countryName, weatherItem, index) => {
  // Function to get the date of the forecasted day
  function getForecastDate(index) {
    const today = new Date(); // Current date
    const forecastDate = new Date(today);
    forecastDate.setDate(today.getDate() + index - 1); // Start with April 2nd
    return `${forecastDate.getFullYear()}-${(forecastDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${forecastDate.getDate().toString().padStart(2, "0")}`;
  }

  // (weatherItem.main.temp-273.15) to convert kelvin to celsius
  if (index === 0) {
    // Weather main card
    return `<div class="details">
       <h2>${cityName}${countryName}(${getForecastDate(index)})</h2>
       <h4><i class="material-icons">device_thermostat</i> Temperature:${(
         weatherItem.main.temp - 273.15
       ).toFixed(2)}°C</h4>
       <h4><i class="material-icons">speed</i> wind-speed: ${
         weatherItem.wind.speed
       }M/s</h4>
       <h4><i class="material-icons">water_drop</i> humidity:${
         weatherItem.main.humidity
       }%</h4>
       <h4><i class="material-icons">description</i> description:${
         weatherItem.weather[0].description
       }</h4>
   </div>
   <div class="icon">
   <img src="http://openweathermap.org/img/wn/${
     weatherItem.weather[0].icon
   }@2x.png" alt="">
       <h6>${weatherItem.weather[0].description}</h6>
   </div>`;
  } else {
    // Other 12 forecast cards
    return `<li class="card">
     <img src="http://openweathermap.org/img/wn/${
       weatherItem.weather[0].icon
     }@2x.png" alt="">
             <h3>(${getForecastDate(index)})</h3>
            <h4><i class="material-icons">device_thermostat</i>:${(
              weatherItem.main.temp - 273.15
            ).toFixed(2)}°C</h4>
            <h4><i class="material-icons">speed</i>:${
              weatherItem.wind.speed
            }%</h4>
            <h4><i class="material-icons">water_drop</i>:${
              weatherItem.main.humidity
            }%</h4>
            
            <h4><i class="material-icons">description</i> :${
              weatherItem.weather[0].description
            }</h4>
        </li>`;
  }
};

const getWeatherDeatils = (countryName, cityName, lat, lon) => {
  const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  fetch(forecastUrl)
    .then((res) => res.json())
    .then((data) => {
      cityInput.value = "";
      weatherCardDiv.innerHTML = "";
      currentWeatherDiv.innerHTML = "";

      //  creating weather cards and adding them to the dom
      const numberOfDays = 12; // Display only 7 days of forecast
      data.list.slice(0, numberOfDays + 1).forEach((forecast, i) => {
        if (i === 0) {
          currentWeatherDiv.insertAdjacentHTML(
            "beforeend",
            createWeatherCard(cityName, countryName, forecast, i)
          );
        } else {
          weatherCardDiv.insertAdjacentHTML(
            "beforeend",
            createWeatherCard(cityName, countryName, forecast, i)
          );
        }
      });
    })
    .catch(() => {
      console.log("Error occurred when fetching the forecast data");
    });
};

// search for any country name or city name
const getCityCoordinates = () => {
  const cityName = cityInput.value.trim();
  const countryName = countryInput.value.trim();
  if (!cityName && !countryName) {
    console.error("City and country names are empty");
    return;
  }
  // const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&units=metric&appid=${apiKey}`;
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryName}&limit=1&appid=${apiKey}`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (!data.length) {
        console.log(`No coordinates found for ${cityName}`);
        return;
      }
      const { country, name, lat, lon } = data[0];
      getWeatherDeatils(country, name, lat, lon);
      displayCountryData(name);
      fetchWeatherData(cityName);
    })
    .catch(() => {
      alert("error occurd when fetching the coordinate");
    });

  getCountryData();
};

// for current location
const getUserCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const reverseGeocodUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

      // get city or country name coordinate using reverse geocodin api
      fetch(reverseGeocodUrl)
        .then((res) => res.json())
        .then((data) => {
          const { country, name } = data[0];
          getWeatherDeatils(country, name, latitude, longitude);
        })
        .catch(() => {
          alert("error occurd when fetching the city");
        });
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        alert("geo location denied please reset the location");
      }
    }
  );
};

// country data
async function getCountryData() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countriesData = await response.json();
  return countriesData;
}
const displayCountryData = async (countryName) => {
  const countries = await getCountryData();
  const country = countries.find(
    (country) => country.name.common === countryName
  );

  if (!country) {
    console.error(`Country data not found for ${countryName}`);
    return;
  }

  const countryDetailsDiv = document.getElementById("country-table-data");
  countryDetailsDiv.innerHTML = `
    <td>${country.name.common}</td>
    <td><img src="${country.flags.png}" alt="Flag"></td>
    <td>Population: ${(country.population / 1000000).toFixed(2)} million</td>
    <td>Area: ${country.area} sq. km</td>
    <td>Capital: ${country.capital}</td>
    <td>Languages: ${Object.values(country.languages).join(", ")}</td>
    
  `;
};
// coutry data end

// weather map start---------------------

const map = L.map("map").setView([20.427, 65.479], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
  map
);

const weatherInfo = document.getElementById("weather-info");
const mapElement = document.getElementById("map");
let marker = null;

function fetchWeatherData(cityName) {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.length === 0) {
        throw new Error(
          "No matching location found. Please enter a valid city name."
        );
      }
      const location = data[0];
      if (location.type === "country") {
        throw new Error("Please enter a city name.");
      }

      // Focus and zoom on the city area with smooth animation
      map.flyTo([location.lat, location.lon], 12, {
        duration: 1, // Duration of the animation in seconds
        easeLinearity: 0.25, // Easing factor, the higher the value, the smoother the animation
      });

      mapElement.style.display = "block"; // Show the map
      fetchWeather(location.lat, location.lon);
    })
    .catch((error) => {
      console.error("Error fetching location data:", error);
      weatherInfo.textContent = error.message;
      mapElement.style.display = "none"; // Hide the map on error
    });
}

function fetchWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Remove previous marker if exists
      if (marker) {
        map.removeLayer(marker);
      }

      // Display weather information
      const { main, wind, rain, clouds } = data;

      const popupContent = `
                <h2>Weather Information</h2>
                <ul>
                <li class="temperature" style="background-color: ${getColorForTemperature(
                  main.temp
                )}">Temperature: ${main.temp}°C</li>
                <li class="wind" style="background-color: ${getColorForWindSpeed(
                  wind.speed
                )}">Wind Speed: ${wind.speed} m/s</li>
                ${
                  rain && rain.pressure
                    ? `<li class="pressure" style="background-color: ${getColorForPressure(
                        rain.pressure
                      )}">Pressure: ${rain.pressure} hPa</li>`
                    : ""
                }
                <li class="clouds" style="background-color: ${getColorForCloudiness(
                  clouds.all
                )}">Cloudiness: ${clouds.all}%</li>
                </ul>
            `;

      const popupOptions = {
        minWidth: 200,
        autoClose: false,
        closeOnClick: false,
        autoPan: false,
        keepInView: true,
        className: "custom-popup", // Add a custom class for styling
      };

      marker = L.marker([data.coord.lat, data.coord.lon]).addTo(map);
      marker.bindPopup(popupContent, popupOptions).openPopup();
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      weatherInfo.textContent =
        "Error fetching weather data. Please try again.";
      mapElement.style.display = "none"; // Hide the map on error
    });
}

function getColorForTemperature(temp) {
  // Customize the temperature color based on  preference
  if (temp < 0) return "#0d47a1"; // Very cold
  if (temp < 10) return "#1976d2"; // Cold
  if (temp < 20) return "#42a5f5"; // Cool
  if (temp < 30) return "#64b5f6"; // Moderate
  if (temp < 40) return "#90caf9"; // Warm
  return "#bbdefb"; // Hot
}

function getColorForWindSpeed(speed) {
  if (speed < 1) return "#81c784"; // Calm
  if (speed < 5) return "#4caf50"; // Light breeze
  if (speed < 10) return "#8bc34a"; // Gentle breeze
  if (speed < 15) return "#cddc39"; // Moderate breeze
  if (speed < 20) return "#ffeb3b"; // Fresh breeze
  return "#ffc107"; // Strong breeze
}

function getColorForPressure(pressure) {
  if (pressure < 1000) return "#ef5350"; // Low pressure
  if (pressure < 1013) return "#ff9800"; // Normal pressure
  if (pressure < 1025) return "#ffeb3b"; // High pressure
  return "#8bc34a"; // Very high pressure
}

function getColorForCloudiness(cloudiness) {
  if (cloudiness < 20) return "#eceff1"; // Clear
  if (cloudiness < 50) return "#cfd8dc"; // Partly cloudy
  if (cloudiness < 80) return "#90a4ae"; // Mostly cloudy
  return "#607d8b"; // Overcast
}

// document
//   .getElementById("search")
//   .addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//       const cityName = document.getElementById("search").value;
//       fetchWeatherData(cityName);
//     }
//   });

// weather map end---------------------

searchButton.addEventListener("click", getCityCoordinates);
locationBtn.addEventListener("click", getUserCoordinates);
cityInput.addEventListener(
  "keyup",
  (e) => e.key === "Enter" && getCityCoordinates()
);
