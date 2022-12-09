'use strict';

const axios = require('axios');
let cache = {};

async function getWeather(lat, lon) {
  const key = `${lat}:${lon}`; // create a key to store into the cache object
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) { // is the timestamp on the cache data within 50 seconds from now.
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    let response = await axios.get(url);
    // attach an empty object to the cache under the "key",
    cache[key] = {};
    // add timestamp and data properties to the object
    cache[key].timestamp = Date.now();
    cache[key].data = parseWeather(response.data);
  }

  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return weatherSummaries;
  } catch (e) {
    throw new Error('Error parsing weather data',e);
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}

module.exports = getWeather;