const errorDisplay = document.querySelector(".error-display");
const dateDisplay = document.querySelector(".date-display");
const clockDisplay = document.querySelector(".clock-display");
const utcClockDisplay = document.querySelector(".utc-clock-display");
const countryDisplay = document.querySelector(".country-display");
const cityDisplay = document.querySelector(".city-display");
const temperatureDisplay = document.querySelector(".temperature-display");
const perceivedTemperatureDisplay = document.querySelector(".perceived-temperature-display");
const weatherDescriptionDisplay = document.querySelector(".weather-description-display");
const weatherIconDisplay = document.querySelector(".weather-icon-display");
const windSpeedDisplay = document.querySelector(".wind-speed-display");
const windDirectionDisplay = document.querySelector(".wind-direction-display");
const humidityDisplay = document.querySelector(".humidity-display");
const pressureDisplay = document.querySelector(".pressure-display");
const sunriseDisplay = document.querySelector(".sunrise-display");
const sunsetDisplay = document.querySelector(".sunset-display");

const API_KEY = "da026bc4ff7d43ff0ec6daf8cce10987";


function showError(error)
{
      errorDisplay.innerHTML = error;
}

async function getWeatherData(lat, lon)
{
      try
      {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pl&appid=${API_KEY}`);

            if(!response.ok)
            {
                  throw new Error("Nie można wydobyć danych!");
            }

            const data = await response.json();

            console.log(data);

            countryDisplay.innerHTML = `Kraj: ${data.sys.country}`;
            cityDisplay.innerHTML = `Miasto: ${data.name}`;
            temperatureDisplay.innerHTML = `Temperatura: ${Math.round(data.main.temp)}°C`;
            perceivedTemperatureDisplay.innerHTML = `Temperatura odczuwalna: ${Math.round(data.main.feels_like)}°C`;
            weatherDescriptionDisplay.innerHTML = `Pogoda: ${data.weather[0].description}`;
            switch(data.weather[0].main)
            {
                  case "Clouds":
                        weatherIconDisplay.innerHTML = "☁️";
                        break;
                  case "Rain":
                        weatherIconDisplay.innerHTML = "🌧️";
                        break;
                  case "Clear":
                        weatherIconDisplay.innerHTML = "☀️";
                        break;
                  case "Thunderstorm":
                        weatherIconDisplay.innerHTML = "⛈️";
                        break;
                  case "Snow":
                        weatherIconDisplay.innerHTML = "❄️";
                        break;
            }
            windSpeedDisplay.innerHTML = `Prędkość wiatru: ${data.wind.speed} m/s`;
            windDirectionDisplay.innerHTML = `Kierunek wiatru: ${data.wind.deg}°`;
            humidityDisplay.innerHTML = `Wilgotność: ${data.main.humidity}%`;
            pressureDisplay.innerHTML = `Ciśnienie: ${data.main.pressure}hPa`;
            sunriseDisplay.innerHTML = `Wschód słonća: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString("pl-PL", {hour: "2-digit", minute: "2-digit"})}`;
            sunsetDisplay.innerHTML = `Zachód słońca: ${new Date(data.sys.sunset * 1000).toLocaleTimeString("pl-PL", {hour: "2-digit", minute: "2-digit"})}`;
            
      }
      catch(error)
      {
            showError(error);
      }
}

function getLocation()
{
      if(navigator.geolocation)
      {
            navigator.geolocation.getCurrentPosition(position => 
                  {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        getWeatherData(lat, lon);
                  }, error => 
                        {
                              showError("Nie można uzyskać lokalizacji!");
                        }
            )
      }
      else
      {
            showError("Twoja przeglądarka nie wspiera geolokalizacji!");
      }
}

function baseInfo()
{
      const now = new Date();

      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');

      const utcHours = now.getUTCHours().toString().padStart(2, '0');
      const utcMinutes = now.getUTCMinutes().toString().padStart(2, '0');

      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear();

      const time = `${hours}:${minutes}`;
      const utcTime = `${utcHours}:${utcMinutes}`;
      const date = `${day}.${month}.${year}`;

      clockDisplay.innerHTML = `Czas lokalny: ${time}`;
      utcClockDisplay.innerHTML = `Czas UTC: ${utcTime}`;
      dateDisplay.innerHTML = date;

      
}

document.addEventListener("DOMContentLoaded", () => {getLocation(); baseInfo(); setInterval(baseInfo, 1000)});
