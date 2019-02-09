const oauth = require('../lib/oauth');
const conf = require('../../../conf')();

module.exports = async ctx => {
  const {
    oauth_verifier: authVerifier,
    oauth_token: authToken,
  } = ctx.request.query;

  if (authVerifier && authToken) {
    await oauth.authorize(authToken, authVerifier).catch(e => {
      ctx.throw(400, '', { message: 'Call initialize before authorize.' });
    });
    const authIdentifier = await oauth.accessToken(authToken, authVerifier);
    ctx.cookies.set('authToken', JSON.stringify(authIdentifier));
    ctx.response.redirect(conf.app_url);
  } else {
    const oauthResponse = await oauth.initialize();
    oauth.storeSecret(oauthResponse.oauth_token_secret);
    ctx.response.redirect(`${conf.discogs.oauth.authorize_url}${oauthResponse.oauth_token}`);
  }
};
