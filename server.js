'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const getWeather = require('./data/weather.js');
const WEATHER_API_KEY=process.env.WEATHER_API_KEY
const axios = require('axios');
const app = express();
app.use(cors());
let PORT = process.env.PORT || 3002
let getWeather = require('./data/weather')
app.get('/weather', weatherHandler);

async function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  try {
    let weatherData = await getWeather(lat, lon);
    // console.log(weatherData);
    response.send(weatherData);
  } catch (e) {
    response.status(500).send('Sorry. Something went wrong!')
  }
}

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));