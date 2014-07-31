var request = require('request');
var fs = require('fs');
var ejs = require('ejs');

var FORECAST_URL = 'https://api.forecast.io/forecast/' + process.env.FORECAST_API_KEY + '/';
var GEOCODE_URL = 'http://maps.googleapis.com/maps/api/geocode/json?address=';

var templateString = String(fs.readFileSync('./views/weather.ejs'));
var template = ejs.compile(templateString);

module.exports = function(req, res) {

  var query = req.body.text.replace('`w ', '');

  request(GEOCODE_URL + encodeURIComponent(query), function(err, resp, body) {
    var address = parseAddress(body);
    request(FORECAST_URL + parseCoords(body), function(err, resp, body) {
      res.send({
        text: template({
          user_name: req.body.user_name,
          address: address,
          summary: parseSummary(body),
          temperature: parseTemperature(body)
        })
      });
    });
  });

};

function parseCoords(body) {
  var data = JSON.parse(body).results[0];
  return data.geometry.location.lat + ',' + data.geometry.location.lng;
}

function parseAddress(body) {
  var data = JSON.parse(body).results[0];
  return data.formatted_address;
}

function parseSummary(body) {
  var data = JSON.parse(body).currently;
  return data.summary;
}

function parseTemperature(body) {
  var data = JSON.parse(body).currently;
  return data.temperature;
}

