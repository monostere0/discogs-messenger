const oauth = require('./oauth');
const expect = require('chai').expect;

describe('OAuth library', () => {
  describe('initialize method', () => {
    it('should return a token', function *() {
      const initalisedObject = yield oauth.initialize();

      expect(initalisedObject.oauth_callback_confirmed).to.equal('true');
    });
  })
});