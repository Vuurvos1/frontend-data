const express = require('express');
const router = express.Router();

const getData = require('./../modules/getData');
const dataHelper = require('./../modules/dataHelpers');

router.get('/garageGeo', async (req, res) => {
  // use post to prevent user from seeing data when going to /garageGeo
  try {
    // Intercept non-POST requests
    // if (req.method != 'POST') {
    //   res.send('ok');
    //   return;
    // }

    // do logic
    const filePathParkeergebied = 'output/specificatiesParkeergebied.json';
    const parkArea = getData.getLocalData(filePathParkeergebied);

    const filePathLocationData = 'output/geoParkeerGarages.json';
    const geoParkGarages = getData.getLocalData(filePathLocationData);

    const key = 'areaid';

    res.status(200);
    res.json(dataHelper.combineDataset(parkArea, geoParkGarages, key));
  } catch (err) {
    console.log(err);
    res.status(404).send('Error');
  }
});

module.exports = router;
