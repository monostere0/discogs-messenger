const discogs = require('../lib/discogs');
const secureRequest = require('../lib/oauth').secureRequest;

module.exports = function *() {
  const rawAuthToken = this.cookies.get('authToken');
  const authToken = rawAuthToken && JSON.parse(rawAuthToken);
  if (!authToken) {
    this.throw(403);
  }

  const currentUser = yield discogs.getIdentity(authToken);
  const messagesResponse = yield discogs.getOrderMessages(authToken, this.params.orderId);
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
  this.body = messagesList.sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
};
