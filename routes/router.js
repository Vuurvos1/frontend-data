const express = require('express');
const router = express.Router();

// Routes
const index = require('./index');
const garageGeo = require('./garageGeo');
const error = require('./error');

router.use('/', index);
router.use('/', garageGeo);
router.use('/', error);

module.exports = router;
