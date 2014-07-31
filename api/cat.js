var request = require('request');
var CAT_URL = 'http://thecatapi.com/api/images/get';

module.exports = function(req, res) {
  request(CAT_URL, function(err, resp, body) {
    res.send({
      text: resp.request.uri.href
    });
  });
};

