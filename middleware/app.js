const koa = require('koa');
const app = koa();
const serve = require('koa-static');
const api = require('./src/api');

app
  .use(api.routes())
  .use(function *(next) {
    const start = new Date;
    yield next;
    const ms = new Date - start;
    console.log(`${this.method} ${this.url} - ${ms}ms`);
  })
  .use(serve('dist'));

module.exports = app;