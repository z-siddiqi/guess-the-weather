let form = document.getElementById("userGuessForm");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let city = document.getElementById("city").value;
    getWeather(city)
        .then(json => {
            let userGuess = {
                weatherCondition: document.querySelector("input[name='condition']:checked").value,
                temperature: +document.querySelector("input[name='temperature']").value,
            };
            let answer = {
                weatherCondition: json.weather[0].main,
                temperature: Math.round(parseFloat(json.main.temp) - 273.15),  // convert to celsius
            };
            let result = JSON.stringify(userGuess) === JSON.stringify(answer) ? "Correct!" : "Wrong!";
            alert(result);
        })
        .catch(error => console.log(error));
});

async function getWeather(city) {
    let response = await fetch(`/.netlify/functions/get-weather?city=${city}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}
