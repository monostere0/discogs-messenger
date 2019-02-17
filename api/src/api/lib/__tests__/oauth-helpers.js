const {
  getAppHeaders,
  getSecureHeaders,
  getInitialHeaders,
  getAuthorizationHeaders,
} = require('../oauth-helpers');


jest.mock('../../../../conf', () => function mockConf() {
  return {
    app_user_agent: 'FooAgent/1.0',
    discogs: {
      oauth: {
        callback_url: 'http://callback-url',
      },
    },
  };
});
jest.mock('../math', () => ({
  round(x) { return x; },
  random() {
    return 0.123456789;
  },
}));

describe('app/lib/oauthHelpers', () => {
  global.Date = class Date {
    getTime() {
      return 13234523452;
    }
  };

  describe('getAppHeaders', () => {
    it('should return the app headers', () => {
      expect(getAppHeaders('sampleHeaders')).toMatchSnapshot();
    });
  });

  describe('getSecureHeaders', () => {
    it('should return the app oAuth headers', () => {
      expect(getSecureHeaders({
        oauth_token: 'oAuthTokenValue',
        oauth_token_secret: 'oAuthSecretValue',
      })).toMatchSnapshot();
    });
  });

  describe('getInitialHeaders', () => {
    it('should return the initial call headers', () => {
      expect(getInitialHeaders()).toMatchSnapshot();
    });
  });

  describe('getAuthorizationHeaders', () => {
    it('should throw an error if the stored secret is null', () => {
      expect(() => getAuthorizationHeaders('foo', 'bar')).toThrow();
    });

    it('should return the authorization headers if the param is supplied', () => {
      expect(getAuthorizationHeaders('foo', 'bar', 'baz')).toMatchSnapshot();
    });
  });
});
