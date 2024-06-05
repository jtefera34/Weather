window.onload = function() {
  const select = document.getElementById("citySelect");
  cities.forEach(city => {
    let option = document.createElement("option");
    option.text = city.name;
    option.value = city.name;
    select.add(option);
  });
};

document.getElementById("citySelect").onchange = function() {
  const selectedCity = cities.find(city => city.name === this.value);
  if (!selectedCity) return;

  const stationLookupUrl = `https://api.weather.gov/points/${selectedCity.latitude},${selectedCity.longitude}`;
  
  fetch(stationLookupUrl)
    .then(response => response.json())
    .then(data => {
      const weatherUrl = data.properties.forecast;
      getWeather(weatherUrl);
    });
};

function getWeather(weatherUrl) {
  fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
      const forecastArray = data.properties.periods;
      displayWeather(forecastArray);
    });
}

function displayWeather(forecastArray) {
  const tableBody = document.getElementById("weatherTable").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Clear previous data
  
  forecastArray.forEach(forecast => {
    const row = tableBody.insertRow();
    row.insertCell(0).innerText = forecast.name;
    row.insertCell(1).innerText = `Temperature ${forecast.temperature} ${forecast.temperatureUnit}`;
    row.insertCell(2).innerText = `Winds ${forecast.windDirection} ${forecast.windSpeed}`;
    row.insertCell(3).innerText = forecast.shortForecast;
  });
}
