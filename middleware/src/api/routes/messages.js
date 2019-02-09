const discogs = require('../lib/discogs');
const secureRequest = require('../lib/oauth').secureRequest;

module.exports = async ctx => {
  const rawAuthToken = ctx.cookies.get('authToken');
  const authToken = rawAuthToken && JSON.parse(rawAuthToken);

  if (!authToken) {
    return ctx.throw(403);
  }

  const { username: currentUser } = await discogs.getIdentity(authToken);
  const messagesResponse = await discogs.getOrderMessages(authToken, ctx.params.orderId);
  const messagesList = await Promise.all(messagesResponse.messages.map(async message => {
    let avatar = null;
    let messageType = null;

    if (message.from) {
      avatar = message.from.avatar_url;
    }

    if (avatar === null && message.actor) {
      avatar = (await discogs.getUserProfile(authToken, message.actor.username)).avatar_url;
    }

    if (message.type === 'message') {
      messageType = (message.from && message.from.username) === currentUser ? 'outbound' : 'inbound';
    } else {
      messageType = 'system';
    }

    return {
      timestamp: message.timestamp,
      subject: message.subject,
      message: message.message,
      type: messageType,
      order: message.order,
      avatar,
    };
  }));

  ctx.body = messagesList.sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
};
