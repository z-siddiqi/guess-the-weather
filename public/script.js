let form = document.getElementById("userGuessForm");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let city = document.getElementById("city").value;
    let weatherCondition = document.querySelectorAll("input[name='condition']")[0].value;
    let temperature = document.querySelectorAll("input[name='temperature']")[0].value;
    getWeather(city);
});

function getWeather(city) {
    let key = '';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.log(error))
}

function displayWeather(data) {
    let weatherCondition = data.weather[0].main;
    let temperature = Math.round(parseFloat(data.main.temp) - 273.15);  // convert to celsius
    console.log(`conditions: ${weatherCondition}, temperature: ${temperature}`);
}
