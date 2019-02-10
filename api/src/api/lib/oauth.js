const request = require('request-promise');
const conf = require('../../../conf')();
const qs = require('querystring');
const _ = require('lodash');

module.exports = { initialize, authorize, accessToken, storeSecret, secureRequest };

var storedTokenSecret = null;

function storeSecret(tokenSecret) {
  storedTokenSecret = tokenSecret;
}

function initialize() {
  return new Promise((resolve, reject) => {
    request.get({
      url: conf.discogs.oauth.request_token_url,
      headers: getAppHeaders(getInitialHeaders())
    }).then((response) => {
      resolve(qs.parse(response));
    }, reject);
  });
}

function authorize(token, verifier) {
  return new Promise((resolve, reject) => {
    request.get({
      url: conf.discogs.oauth.request_token_url,
      headers: getAppHeaders(getAuthorizationHeaders(token, verifier))
    }).then((response) => {
      resolve(qs.parse(response));
    }, reject);
  });
}

function accessToken(token, verifier) {
  return new Promise((resolve, reject) => {
    request.post({
      url: conf.discogs.oauth.access_token_url,
      headers: getAppHeaders(getAuthorizationHeaders(token, verifier))
    }).then((response) => {
      resolve(qs.parse(response));
    }, reject);
  });
}

function secureRequest(requestConfig) {
  const secureRequestConfig = Object.assign({}, _.omit(requestConfig, 'oauth'), {
    headers: getAppHeaders(getSecureHeaders(requestConfig.oauth))
  });
  return request(secureRequestConfig);
}

function getAppHeaders(oauthHeaders) {
  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/vnd.discogs.v2.plaintext+json',
    'Authorization': oauthHeaders,
    'User-Agent': conf.app_user_agent
  };
}

function getSecureHeaders(oAuthObject) {
  const date = new Date();
  return [`OAuth oauth_consumer_key="${process.env.DISCOGS_OAUTH_KEY}"`,
    `oauth_nonce="${getNonce(date)}"`,
    `oauth_signature="${percentEncode(`${process.env.DISCOGS_OAUTH_SECRET}&${oAuthObject.oauth_token_secret}`)}"`,
    'oauth_signature_method="PLAINTEXT"',
    `oauth_timestamp="${date.getTime()}"`,
    `oauth_token="${oAuthObject.oauth_token}"`].join(', ');
}

function getInitialHeaders() {
  const date = new Date();
  return [`OAuth oauth_consumer_key="${process.env.DISCOGS_OAUTH_KEY}"`,
    `oauth_nonce="${getNonce(date)}"`,
    `oauth_signature="${percentEncode(process.env.DISCOGS_OAUTH_SECRET)}&"`,
    'oauth_signature_method="PLAINTEXT"',
    `oauth_timestamp="${date.getTime()}"`,
    `oauth_callback="${conf.oauth_callback_url}"`].join(', ');
}

function getAuthorizationHeaders(token, verifier) {
  if (!storedTokenSecret) {
    throw new Error('Token secret is null. Call initialize() before authorize().');
  }
  const date = new Date();
  return [`OAuth oauth_consumer_key="${process.env.DISCOGS_OAUTH_KEY}"`,
    `oauth_nonce="${getNonce(date)}"`,
    `oauth_token=${token}`,
    `oauth_signature="${percentEncode(`${process.env.DISCOGS_OAUTH_SECRET}&${storedTokenSecret}`)}"`,
    'oauth_signature_method="PLAINTEXT"',
    `oauth_timestamp="${date.getTime()}"`,
    `oauth_verifier="${verifier}"`].join(', ');
}

function getNonce(date) {
  return (Math.round(date.getTime() * Math.random())).toString(16);
}

function percentEncode(str) {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/\*/g, '%2A')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
}
