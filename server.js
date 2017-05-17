var server = require('pushstate-server');
var cool = require('cool-ascii-faces');

var port = process.env.PORT || 5000;
server.start({
  port: port,
  directory: './build'
});
