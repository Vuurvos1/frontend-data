const express = require('express');
const router = express.Router();

const getData = require('./../modules/getData');
const dataHelper = require('./../modules/dataHelpers');

const fs = require('fs');
const {getColumns} = require('./../modules/dataHelpers');

router.post('/garageGeo', async (req, res) => {
  // use post to prevent user from seeing data when going to /garageGeo
  try {
    // Intercept non-POST requests
    if (req.method != 'POST') {
      res.send('ok');
      return;
    }

    // do logic
    const filePathParkeergebied = 'output/specificatiesParkeergebied.json';
    const parkArea = getData.getLocalData(filePathParkeergebied);

    const filePathLocationData = 'output/geoParkeerGarages.json';
    const geoParkGarages = getData.getLocalData(filePathLocationData);

    const key = 'areaid';

    let responseData = dataHelper.combineDataset(parkArea, geoParkGarages, key);

    // add lat and lng to work with d3 hexgrid
    responseData.map((i) => {
      i.lat = Number(i.location.latitude);
      i.lng = Number(i.location.longitude);
    });

    const dataKeys = ['areaid', 'lat', 'lng', 'areadesc', 'capacity'];
    responseData = getColumns(responseData, dataKeys);

    fs.writeFileSync(`output/YEP.json`, JSON.stringify(responseData));

    res.status(200);
    res.json(responseData);
  } catch (err) {
    console.log(err);
    res.status(404).send('Error');
  }
});

module.exports = router;
