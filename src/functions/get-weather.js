"use strict";

const fetch = require("node-fetch");

exports.handler = async function (event) {
    // grab query param
    const city = event.queryStringParameters.city;
    if (!city) {
        return {
            statusCode: 400,
            body: "Missing 'city' parameter.",
        }
    }

    // use node-fetch to call the openweathermap api
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`);
    if (!response.ok) {
        return {
            statusCode: 500,
            body: "Error!",
        }
    }

    // return weather data
    const json = await response.json();
    console.log(json);
    return {
        statusCode: 200,
        body: JSON.stringify(json),
    }
};