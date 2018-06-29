const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const api = require('./src/api');

app
  .use(serve('dist'))
  .use(api.routes())
  .use(api.allowedMethods())
  .use(async (ctx, next) => {
    const start = new Date;
    await next;
    const ms = new Date - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  })

module.exports = app;