const conf = require('./conf')();
const app = require('./app');
const https = require('https');
const fs = require('fs');

const httpsOptions = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem'),
};

https.createServer(
  httpsOptions,
  app.callback(),
).listen(process.env.port || conf.port);
