const request = require('request-promise');
const conf = require('../../../conf')();
const qs = require('querystring');
const _ = require('lodash');
const {
  getAppHeaders,
  getSecureHeaders,
  getInitialHeaders,
  getAuthorizationHeaders,
} = require('./oauth-helpers');

module.exports = { initialize, authorize, accessToken, storeSecret, secureRequest };

let storedTokenSecret = null;

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
      headers: getAppHeaders(getAuthorizationHeaders(token, verifier, storedTokenSecret))
    }).then((response) => {
      resolve(qs.parse(response));
    }, reject);
  });
}

function accessToken(token, verifier) {
  return new Promise((resolve, reject) => {
    request.post({
      url: conf.discogs.oauth.access_token_url,
      headers: getAppHeaders(getAuthorizationHeaders(token, verifier, storedTokenSecret))
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
