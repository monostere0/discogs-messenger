const baseUrl = '../api';
import fetch from './fetch';

const messages = [
  {
    id: 1, from: 'blabla',
    preview: 'blabla...',
    timestamp: (+new Date),
    avatar: 'https://pbs.twimg.com/profile_images/666037217832243200/TvOVC0ns.png'
  },
  {
    id: 2,
    from: 'blabla',
    preview: 'blabla...',
    timestamp: (+new Date),
    avatar: 'https://pbs.twimg.com/profile_images/666037217832243200/TvOVC0ns.png'
  },
  {
    id: 3,
    from: 'blabla',
    preview: 'blabla...',
    timestamp: (+new Date),
    avatar: 'https://pbs.twimg.com/profile_images/666037217832243200/TvOVC0ns.png'
  },
  {
    id: 4,
    from: 'blabla',
    preview: 'blabla...',
    timestamp: (+new Date), avatar: 'https://pbs.twimg.com/profile_images/666037217832243200/TvOVC0ns.png'
  }
];

const conversation = [
  {
    'timestamp': '2015-06-02T13:17:54-07:00',
    'message': 'example_buyer received refund of $5.00.',
    'type': 'refund_received',
    'outbound': false,
    'order': {
      'resource_url': 'https://api.discogs.com/marketplace/orders/845236-9',
      'id': '845236-9'
    },
    'subject': ''
  },
  {
    'timestamp': '2015-06-02T13:17:07-01:00',
    'message': 'Thank you for your order!',
    'type': 'message',
    'outbound': false,
    'order': {
      'resource_url': 'https://api.discogs.com/marketplace/orders/845236-9',
      'id': '845236-9'
    },
    'subject': 'New Message - Order #845236-9 - TZ Goes Beyond 10! + 1 more item'
  },
  {
    'timestamp': '2015-06-02T13:17:07-04:00',
    'message': 'No problem dude!',
    'type': 'message',
    'outbound': true,
    'order': {
      'resource_url': 'https://api.discogs.com/marketplace/orders/845236-9',
      'id': '845236-9'
    },
    'subject': 'New Message - Order #845236-9 - TZ Goes Beyond 10! + 1 more item'
  },
  {
    'timestamp': '2015-06-02T13:17:07-02:00',
    'message': 'You\'re welcome!',
    'type': 'message',
    'outbound': true,
    'order': {
      'resource_url': 'https://api.discogs.com/marketplace/orders/845236-9',
      'id': '845236-9'
    },
    'subject': 'New Message - Order #845236-9 - TZ Goes Beyond 10! + 1 more item'
  }
];

export async function getIdentity(): Promise<any> {
  return await fetchData('identity');
}

export async function getMessages(): Promise<any> {
  return await Promise.resolve(messages);
  // return await fetchData('messages');
}

export async function getConversation(orderId: string): Promise<any> {
  return await Promise.resolve(conversation);
  // return await fetchData(`messages/${orderId}`);
}

async function fetchData(apiPath: string): Promise<any> {
  const result = await fetch(`${baseUrl}/${apiPath}`);
  return await result.json();
}
