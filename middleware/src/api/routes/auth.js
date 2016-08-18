const oauth = require('../lib/oauth');
const conf = require('../../../conf')();

module.exports = function *() {
  const authVerifier = this.request.query.oauth_verifier;
  const authToken = this.request.query.oauth_token;

  if (authVerifier && authToken) {
    yield oauth.authorize(authToken, authVerifier);
    const authIdentifier = yield oauth.accessToken(authToken, authVerifier);
    this.cookies.set('authToken', JSON.stringify(authIdentifier));
    this.response.redirect(conf.app_url);
  } else {
    const oauthResponse = yield oauth.initialize();
    oauth.storeSecret(oauthResponse.oauth_token_secret);
    this.response.redirect(`${conf.discogs.oauth.authorize_url}${oauthResponse.oauth_token}`);
  }
};
