const apiKey = "7f2cc5f5212a431dc6aff49863aba8dc"; 
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherCard = document.getElementById("weather-card");
const errorMsg = document.getElementById("error-msg");

async function fetchWeather(city) {
    try {
        errorMsg.classList.add("hidden");
        const response = await fetch(
            
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("City not found. Please try again.");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherCard.classList.add("hidden");
        errorMsg.innerText = error.message;
        errorMsg.classList.remove("hidden");
    }
}

function displayWeather(data) {
    document.getElementById("city-name").innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById("condition").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind-speed").innerText = `Wind: ${data.wind.speed} m/s`;

    weatherCard.classList.remove("hidden");
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }
});