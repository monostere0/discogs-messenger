require('dotenv').config();

const conf = require('./conf')();
const app = require('./app');

app.listen(process.env.PORT || conf.port /* First Heroku, then our conf */,
   () => console.log(`Koa is listening on localhost:${conf.port}`));
