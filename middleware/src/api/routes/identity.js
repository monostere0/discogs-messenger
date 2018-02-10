const discogs = require('../lib/discogs');

module.exports = async ctx => {
  const authToken = JSON.parse(ctx.cookies.get('authToken') || null);

  ctx.body = authToken ? (await discogs.getIdentity(authToken)).username : '';
};
