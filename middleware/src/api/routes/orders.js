const discogs = require('../lib/discogs');
const secureRequest = require('../lib/oauth').secureRequest;

module.exports = function *() {
  const rawAuthToken = this.cookies.get('authToken');
  const authToken = rawAuthToken && JSON.parse(rawAuthToken);
  if (!authToken) {
    this.throw(403);
  }

  const ordersResponse = yield discogs.getOrders(authToken);
  this.body = ordersResponse.orders.map(order => {
    return {
      id: order.id,
      from: order.buyer.username,
      preview: order.items.length && order.items[0].release.description,
      timestamp: order.last_activity,
      avatar: 'https://pbs.twimg.com/profile_images/666037217832243200/TvOVC0ns.png'
    };
  });
};
