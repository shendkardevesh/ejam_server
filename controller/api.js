const OAuth = require('oauth');
const logger = require('tracer').colorConsole();

const getWeatherReport = (city) => {
  return new Promise((resolve, reject) => {
    const header = {
      'X-Yahoo-App-Id': 'hlVFtK7a'
    };
    
    const request = new OAuth.OAuth(
      null,
      null,
      process.env.CONSUMER_KEY,
      process.env.CONSUMER_SECRET,
      '1.0',
      null,
      'HMAC-SHA1',
      null,
      header
    );
    logger.info('city:', city);
    const url = `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${city}&format=json&u=c`;
    request.get(url, null,null, function(err, data, result) {
      if (err) {
        reject(err);
      } else {
          resolve(JSON.parse(data));
      }
    });
  })
};

const getWeatherReports = async (cities) => {
  try {
    const response = await Promise.all(cities.map(item => getWeatherReport(item)));
    return response;
  } catch(err) {
    logger.error(err);
    throw(err);
  }
};

module.exports = {
  getWeatherReport,
  getWeatherReports
}
