const discogs = require('../lib/discogs');
const secureRequest = require('../lib/oauth').secureRequest;

module.exports = function *() {
  const rawAuthToken = this.cookies.get('authToken');
  const authToken = rawAuthToken && JSON.parse(rawAuthToken);
  if (!authToken) {
    this.throw(403);
  }

  const ordersResponse = yield discogs.getOrders(authToken);
  this.body = yield ordersResponse.orders.map(function *(order) {
    const { avatar_url: avatar } = yield discogs.getUserProfile(authToken, order.buyer.username);
    return {
      id: order.id,
      from: order.buyer.username,
      preview: order.items.length && order.items[0].release.description,
      timestamp: order.last_activity,
      avatar
    };
  });
};
