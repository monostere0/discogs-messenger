const discogs = require('../lib/discogs');
const secureRequest = require('../lib/oauth').secureRequest;

module.exports = async ctx => {
  const rawAuthToken = ctx.cookies.get('authToken');
  const authToken = rawAuthToken && JSON.parse(rawAuthToken);
  if (!authToken) {
    ctx.throw(403);
  }

  const currentUser = await discogs.getIdentity(authToken);
  const messagesResponse = await discogs.getOrderMessages(authToken, ctx.params.orderId);
  const messagesList = messagesResponse.messages.map(message => {
    return {
      timestamp: message.timestamp,
      subject: message.subject,
      message: message.message,
      outbound: (message.from && message.from.username) === currentUser.username,
      type: message.type,
      order: message.order
    };
  });
  ctx.body = messagesList.sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
};
