const discogs = require('../lib/discogs');
const secureRequest = require('../lib/oauth').secureRequest;

module.exports = async ctx => {
  const rawAuthToken = ctx.cookies.get('authToken');
  const authToken = rawAuthToken && JSON.parse(rawAuthToken);
  if (!authToken) {
    ctx.throw(403);
  }

  const ordersResponse = await discogs.getOrders(authToken);
  ctx.body = await Promise.all(ordersResponse.orders.map(async order => {
    const { avatar_url: avatar } = await discogs.getUserProfile(authToken, order.buyer.username);
    return {
      id: order.id,
      from: order.buyer.username,
      preview: order.items.length && order.items[0].release.description,
      timestamp: order.last_activity,
      avatar
    };
  }));
};
