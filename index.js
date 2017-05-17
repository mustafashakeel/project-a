var server = require('pushstate-server');
var port = process.env.PORT || 5000;
server.start({
  port: port,
  directory: './build'
});