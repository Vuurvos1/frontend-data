require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const axios = require('axios');

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: false}));

const corsOptions = {
  origin: 'http://localhost:1234',
  origin: 'http://localhost:5000',
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors((corsOptions)));

app.use(express.static('dist'));
app.use(require('./routes/router'));

// Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED
// parking garage capacity, areaId
// https://opendata.rdw.nl/resource/b3us-f26s.json

// GEO Parkeer Garages
// location, areaId
// https://opendata.rdw.nl/resource/t5pc-eb34.json

/**
 * Save data to files when server is started
 */
async function getMeStuff() {
  const parkAreaSpecUrl = 'https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=5000';
  const parkAreaSpec = (await axios.get(parkAreaSpecUrl)).data;

  fs.writeFileSync('output/specificatiesParkeergebied.json',
      JSON.stringify(parkAreaSpec));

  const garageGeoUrl = 'https://opendata.rdw.nl/resource/t5pc-eb34.json?$limit=5000';
  const garageGeo = (await axios.get(garageGeoUrl)).data;

  fs.writeFileSync('output/geoParkeerGarages.json',
      JSON.stringify(garageGeo));
}

getMeStuff();

// Setup server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


