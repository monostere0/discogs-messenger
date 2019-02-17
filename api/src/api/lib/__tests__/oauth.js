const oauth = require('../oauth');
const request = require('request-promise');

jest.mock('request-promise', () => ({
  get: jest.fn(() => Promise.resolve('oauth_callback_confirmed=true')),
  post: jest.fn(() => Promise.resolve('access_token=foo')),
}));
jest.mock('../../../../conf', () => function mockConf() {
  return {
    app_user_agent: 'FooAgent/1.0',
    discogs: {
      oauth: {
        request_token_url: 'http://request-token-url',
        callback_url: 'http://callback-url',
        access_token_url: 'http://access-token-url',
      },
    },
  };
});
jest.mock('../oauth-helpers', () => ({
  getAppHeaders: () => ({}),
  getAuthorizationHeaders: () => ({}),
  getInitialHeaders: () => ({}),
  getSecureHeaders: () => ({}),
}));


describe('lib/oauth.js', () => {
  describe('oauth.initialize()', () => {
    it('should return a token', async () => {
      const initalisedObject = await oauth.initialize();
      expect(request.get).toHaveBeenCalledWith({
        url: 'http://request-token-url',
        headers: {},
      });
      expect(initalisedObject.oauth_callback_confirmed).toBe('true');
    });
  });

  describe('oauth.authorize(token, verifier)', () => {
    it('should return a token', async () => {
      const initalisedObject = await oauth.authorize('foo', 'bar');
      expect(request.get).toHaveBeenCalledWith({
        url: 'http://request-token-url',
        headers: {},
      });
      expect(initalisedObject.oauth_callback_confirmed).toBe('true');
    });
  });

  describe('oauth.accessToken(token, verifier)', () => {
    it('should return a token', async () => {
      const accessToken = await oauth.accessToken('foo', 'bar');
      expect(request.post).toHaveBeenCalledWith({
        url: 'http://access-token-url',
        headers: {},
      });
      expect(accessToken.access_token).toBe('foo');
    });
  });
});
