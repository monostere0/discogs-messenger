const oauth = require('./oauth');
const { expect } = require('chai');

describe('OAuth library', () => {
  describe('initialize method', () => {
    it('should return a token', async () => {
      const initalisedObject = await oauth.initialize();

      expect(initalisedObject.oauth_callback_confirmed).to.equal('true');
    });
  })
});