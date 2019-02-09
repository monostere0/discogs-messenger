module.exports = authMiddleware;

async function authMiddleware(ctx, next) {
  const rawAuthToken = ctx.cookies.get('authToken');
  const authToken = rawAuthToken && JSON.parse(rawAuthToken);
  if (!authToken) {
    ctx.throw(403);
  }
  ctx.authToken = authToken;
  await next();
}