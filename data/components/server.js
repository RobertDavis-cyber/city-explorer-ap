'use strict';

require('dotenv');
const express = require('express');
const cors = require('cors');
const getWeather = require('./weather.js');

const app = express();
app.use(cors());

app.get('/weather', weatherHandler);

async function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  try {
    let weatherData = await getWeather(lat, lon);
    response.send(weatherData);
  } catch (e) {
    response.status(500).send('Sorry. Something went wrong!')
  }
}

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));