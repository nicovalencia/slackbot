var _ = require('lodash');

module.exports = function(req, res) {
  var data = [];
  _.each(req.body, function(val, key) {
    data.push('*' + key + ':* ' + val);
  });

  msg = 'Received data: \n' + data.join('\n');
  res.send(msg);
};

