const countries = [
  "canada", "usa", "australia", "germany", "france", "india", "japan", "china", "brazil", "south-africa",
  "italy", "spain", "mexico", "argentina", "nigeria", "russia", "uk", "south-korea", "indonesia", "turkey",
  "pakistan", "dubai", "saudi-arabia" // Added Pakistan, Dubai, and Saudi Arabia
  /* Add the rest of the 99 countries here */
];

// Get the timezone for a country (simple map for demo)
const countryTimezones = {
  canada: 'America/Toronto',
  usa: 'America/New_York',
  australia: 'Australia/Sydney',
  germany: 'Europe/Berlin',
  france: 'Europe/Paris',
  india: 'Asia/Kolkata',
  japan: 'Asia/Tokyo',
  china: 'Asia/Shanghai',
  brazil: 'America/Sao_Paulo',
  'south-africa': 'Africa/Johannesburg',
  italy: 'Europe/Rome',
  spain: 'Europe/Madrid',
  mexico: 'America/Mexico_City',
  argentina: 'America/Argentina/Buenos_Aires',
  nigeria: 'Africa/Lagos',
  russia: 'Europe/Moscow',
  uk: 'Europe/London',
  'south-korea': 'Asia/Seoul',
  indonesia: 'Asia/Jakarta',
  turkey: 'Europe/Istanbul',
  pakistan: 'Asia/Karachi',          // Added timezone for Pakistan
  dubai: 'Asia/Dubai',               // Added timezone for Dubai
  'saudi-arabia': 'Asia/Riyadh'      // Added timezone for Saudi Arabia
  // Add more timezones as needed
};

// Function to fetch and display weather data
const getWeatherData = (country) => {
  fetch(`https://goweather.herokuapp.com/weather/${country}`)
    .then((response) => response.json())
    .then((data) => {
      createWeatherCard(country, data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
};

// Function to create weather cards dynamically
const createWeatherCard = (country, weather) => {
  const weatherContainer = document.getElementById("weatherContainer");

  // Get the current time for the country
  const timezone = countryTimezones[country];
  const currentTime = luxon.DateTime.now().setZone(timezone).toLocaleString(luxon.DateTime.TIME_WITH_SECONDS);

  const card = document.createElement("div");
  card.classList.add("weather-card");
  card.setAttribute("data-aos", "fade-up");

  card.innerHTML = `
    <h2>${country.charAt(0).toUpperCase() + country.slice(1)}</h2>
    <p><strong>Temperature:</strong> ${weather.temperature || "--"}</p>
    <p><strong>Description:</strong> ${weather.description || "No data available"}</p>
    <p><strong>Wind Speed:</strong> ${weather.wind || "--"}</p>
    <p><strong>Current Time:</strong> ${currentTime || "--"}</p>
  `;

  weatherContainer.appendChild(card);
};

// Function to debounce user input for better performance
const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

// Function to search through the country cards
const searchCountry = () => {
  const searchValue = document.getElementById("searchBar").value.toLowerCase();
  const cards = document.querySelectorAll(".weather-card");

  cards.forEach((card) => {
    const countryName = card.querySelector("h2").textContent.toLowerCase();
    card.style.display = countryName.includes(searchValue) ? "block" : "none";
  });
};

// Event listener for the search bar (debounced)
document.getElementById("searchBar").addEventListener("input", debounce(searchCountry, 300));

// Fetch weather data for all countries
countries.forEach((country) => {
  getWeatherData(country);
});
