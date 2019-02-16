const logger = require('../../../logger');

module.exports = errorMiddleware;

async function errorMiddleware(ctx, next) {
  try {
    await next();
  } catch (error) {
    logger.error(error, error.status);
    ctx.status = error.status || 500;
    ctx.body = error.message;
    ctx.app.emit('error', error, ctx);
  }
}
