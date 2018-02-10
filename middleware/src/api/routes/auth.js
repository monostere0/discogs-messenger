const oauth = require('../lib/oauth');
const conf = require('../../../conf')();

module.exports = async ctx => {
  const authVerifier = ctx.request.query.oauth_verifier;
  const authToken = ctx.request.query.oauth_token;

  if (authVerifier && authToken) {
    await oauth.authorize(authToken, authVerifier);
    const authIdentifier = await oauth.accessToken(authToken, authVerifier);
    ctx.cookies.set('authToken', JSON.stringify(authIdentifier));
    ctx.response.redirect(conf.app_url);
  } else {
    const oauthResponse = await oauth.initialize();
    oauth.storeSecret(oauthResponse.oauth_token_secret);
    ctx.response.redirect(`${conf.discogs.oauth.authorize_url}${oauthResponse.oauth_token}`);
  }
};
