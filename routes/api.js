const express = require('express');
const router = express.Router();
const logger = require('tracer').colorConsole();
const apiCtrl = require('../controller/api');


router.get('/report', async (req, res) => {
  try {
    logger.info(req.query);
    logger.info(typeof req.query.cities);
    const cities = JSON.parse(req.query.cities);
    logger.info('cities', cities);
    const response = await apiCtrl.getWeatherReports(cities);
    // const parseResponse = JSON.parse(response);
    res.jsonp(response);
  } catch(err) {
    logger.error(err);
    res.status(500).send(err);
  }
})

module.exports = router;