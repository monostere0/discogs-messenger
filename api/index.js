const conf = require('./conf')();
const app = require('./app');

app.listen(process.env.PORT || conf.port /* First Heroku, then our conf */,
  // eslint-disable-next-line no-console
  () => console.log(`Koa is listening on localhost:${conf.port}`));
