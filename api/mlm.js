module.exports = function(req, res) {
  var msg = 'much like ' + req.body.user_name;
  res.send({
    text: msg
  });
};

