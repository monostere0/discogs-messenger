const secureRequest = require('./oauth').secureRequest;
const conf = require('../../../conf')();
const qs = require('querystring');

module.exports = {
  getOrders,
  getOrderMessages,
  getIdentity,
  getUserProfile
};

function getOrders(authToken) {
  return secureRequest({
    url: getApiUrl('marketplace/orders?status=Shipped'),
    oauth: authToken,
    json: true
  });
}

function getOrderMessages(authToken, orderId) {
  return secureRequest({
    url: getApiUrl(`marketplace/orders/${orderId}/messages`),
    oauth: authToken,
    json: true
  });
}

function getUserProfile(authToken, username) {
  return secureRequest({
    url: getApiUrl(`users/${username}`),
    oauth: authToken,
    json: true
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
