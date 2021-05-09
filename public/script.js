const cacheTime = 150000;  // 2.5 minutes
const cache = {};
const form = document.getElementById("userGuessForm");
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const city = document.getElementById("city").value;
    const weatherData = await getWeather(city, cacheTime);
    const userGuess = {
        weatherCondition: document.querySelector("input[name='condition']:checked").value,
        temperature: +document.querySelector("input[name='temperature']").value,  // convert to int with +
    };
    const answer = {
        weatherCondition: weatherData.weather[0].main,
        temperature: Math.round(parseFloat(weatherData.main.temp) - 273.15),  // convert to celsius
    };
    const result = JSON.stringify(userGuess) === JSON.stringify(answer) ? "Correct!" : "Wrong!";
    alert(result);
});

async function getWeather(city, time) {
    const now = new Date().getTime();
    if (!cache[city] || cache[city].cacheTimer < now) {
        cache[city] = await fetchWeather(city);
        cache[city].cacheTimer = now + time;
    }
    return cache[city];
}

async function fetchWeather(city) {
    const response = await fetch(`/.netlify/functions/fetch-weather?city=${city}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const weather = await response.json();
    return weather;
}
