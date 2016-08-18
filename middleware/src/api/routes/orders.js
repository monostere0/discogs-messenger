const discogs = require('../lib/discogs');
const secureRequest = require('../lib/oauth').secureRequest;

module.exports = function *() {
  const rawAuthToken = this.cookies.get('authToken');
  const authToken = rawAuthToken && JSON.parse(rawAuthToken);
  if (!authToken) {
    this.throw(403);
  }

  this.body = (yield discogs.getOrders(authToken)).orders;
};
