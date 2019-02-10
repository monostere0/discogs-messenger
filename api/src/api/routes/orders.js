const discogs = require('../lib/discogs');

module.exports = async ctx => {
  const { authToken } = ctx;

  const ordersResponse = await discogs.getOrders(authToken).catch(() => { });

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
