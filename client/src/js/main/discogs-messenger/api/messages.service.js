angular
  .module('discogs.messenger')
  .service('messagesService', messagesService);

/*@ngInject*/
function messagesService($http, $q, apiURL, $log) {
  const messages = [
    {id:1, from:'blabla', preview:'blabla...',timestamp:(+new Date),avatar:'https://pbs.twimg.com/profile_images/666037217832243200/TvOVC0ns.png'},
    {id:2, from:'blabla', preview:'blabla...',timestamp:(+new Date),avatar:'https://pbs.twimg.com/profile_images/666037217832243200/TvOVC0ns.png'},
    {id:3, from:'blabla', preview:'blabla...',timestamp:(+new Date),avatar:'https://pbs.twimg.com/profile_images/666037217832243200/TvOVC0ns.png'},
    {id:4, from:'blabla', preview:'blabla...',timestamp:(+new Date),avatar:'https://pbs.twimg.com/profile_images/666037217832243200/TvOVC0ns.png'}
  ];
  const conversation = [
    {"timestamp": "2015-06-02T13:17:54-07:00",
      "message": "example_buyer received refund of $5.00.",
      "type": "refund_received",
      "outbound": false,
      "order": {
        "resource_url": "https://api.discogs.com/marketplace/orders/845236-9",
        "id": "845236-9"
      },
      "subject": ""},
    {"timestamp": "2015-06-02T13:17:07-07:00",
      "message": "Thank you for your order!",
      "type": "message",
      "outbound": false,
      "order": {
        "resource_url": "https://api.discogs.com/marketplace/orders/845236-9",
        "id": "845236-9"
      },
      "subject": "New Message - Order #845236-9 - TZ Goes Beyond 10! + 1 more item"},
    {"timestamp": "2015-06-02T13:17:07-07:00",
      "message": "No problem dude!",
      "type": "message",
      "outbound": true,
      "order": {
        "resource_url": "https://api.discogs.com/marketplace/orders/845236-9",
        "id": "845236-9"
      },
      "subject": "New Message - Order #845236-9 - TZ Goes Beyond 10! + 1 more item"},
    {"timestamp": "2015-06-02T13:17:07-07:00",
      "message": "You're welcome!",
      "type": "message",
      "outbound": true,
      "order": {
        "resource_url": "https://api.discogs.com/marketplace/orders/845236-9",
        "id": "845236-9"
      },
      "subject": "New Message - Order #845236-9 - TZ Goes Beyond 10! + 1 more item"}
  ];

  return {getMessagesList, getConversation};

  function getMessagesList() {
    return $http
      .get(`${apiURL.baseUrl}/orders`)
      .then(requestSuccess)
      .catch(requestFail);
  }

  function getConversation(messageId) {
    return conversation.slice(messageId);
  }

  function requestSuccess(response) {
    return response.data;
  }
  function requestFail(response) {
    $log.error('mesagesService: ', response);
    return $q.reject(response.data);
  }
}