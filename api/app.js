require('dotenv').config();

const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const koaBunyanLogger = require('koa-bunyan-logger');

const api = require('./src/api');
const logger = require('./logger');
const errorMiddleware = require('./src/api/middlewares/error');

app
  .use(errorMiddleware)
  .use(koaBunyanLogger(logger))
  .use(serve('dist'))
  .use(api.routes())
  .use(api.allowedMethods());

module.exports = app;
