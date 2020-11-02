require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const axios = require('axios');

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));

const getData = require('./modules/getData');

app.use(express.static('public'));
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

// Setup server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
