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
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors((corsOptions)));

const getData = require('./modules/getData');
const dataHelper = require('./modules/dataHelpers');

app.use(express.static('dist'));
app.use(require('./routes/router'));

// Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED
// parking garage capacity, areaId
// https://opendata.rdw.nl/resource/b3us-f26s.json

// GEO Parkeer Garages
// location, areaId
// https://opendata.rdw.nl/resource/t5pc-eb34.json

// async function getMeStuff() {
//   let allData = await axios.get('https://npropendata.rdw.nl/parkingdata/v2/');
//   allData = allData.data.ParkingFacilities;

//   for (let i of allData) {
//     const data = await getData.fetchData(i.staticDataUrl);
//     fs.writeFileSync(`output/dummyData/${i.identifier}.json`, JSON.stringify(data))
//   }
// }

// getMeStuff();

const filePathLocationData = 'output/geoParkeerGarages.json';
const geoParkeerGarages = getData.getLocalData(filePathLocationData);

const filePathParkeergebied = 'output/specificatiesParkeergebied.json';
const Parkeergebied = getData.getLocalData(filePathParkeergebied);

const key = 'areaid';
const z = dataHelper.combineDataset(Parkeergebied, geoParkeerGarages, key);
// console.log(z[0], z[1], z[2]);


// Setup server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


