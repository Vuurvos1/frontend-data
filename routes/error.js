
const express = require('express');
const router = express.Router();

router.get('*', (req, res) => {
  res.send(`This page doesn't exist`);
});

module.exports = router;
