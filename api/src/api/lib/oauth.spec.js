const nock = require('nock');
const { expect } = require('chai');
const oauth = require('./oauth');

describe('OAuth library', () => {
  before(() => {
    nock('https://api.discogs.com/')
      .get('/oauth/request_token')
      .reply(200, 'oauth_callback_confirmed=true');

    describe('initialize method', () => {
      it('should return a token', async () => {
        const initalisedObject = await oauth.initialize();

        expect(initalisedObject.oauth_callback_confirmed).to.equal('true');
      });
    });

    after(() => nock.cleanAll());
  });
});
