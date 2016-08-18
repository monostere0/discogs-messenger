const discogs = require('../lib/discogs');

module.exports = function *() {
  const authToken = JSON.parse(this.cookies.get('authToken') || null);

  this.body = authToken ? (yield discogs.getIdentity(authToken)).username : '';
};
