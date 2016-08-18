const secureRequest = require('./oauth').secureRequest;
const conf = require('../../../conf')();
const qs = require('querystring');

module.exports = {getOrders, getIdentity};

function getOrders(authToken) {
  return secureRequest({
    url: getApiUrl('marketplace/orders?status=Shipped'),
    oauth: authToken
  });
}

function getIdentity(authToken) {
  return secureRequest({
    url: getApiUrl('oauth/identity'),
    oauth: authToken,
    json: true
  });
}

function getApiUrl(endpoint) {
  return `${conf.discogs.api_url}/${endpoint}`;
}