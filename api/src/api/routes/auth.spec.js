const nock = require('nock');
const { expect } = require('chai');

const app = require('../../../app');
const request = require('supertest').agent(app.listen());

describe('/api/auth', () => {
  before(() => {
    nock('https://api.discogs.com/')
      .get('/oauth/request_token')
      .reply(200, 'oauth_token=abc123&oauth_token_secret=xyz789')
      .post('/oauth/access_token')
      .reply(200, 'oauth_token=abc123&oauth_token_secret=xyz789');
  });

  it('should throw an exception if trying to authorize before init', async () => {
    const response = await request.get('/api/auth?oauth_verifier=foo&oauth_token=bar');

    expect(response.status).to.equal(400);
    expect(response.text).to.equal('Call initialize before authorize.');
  });

  it('shold store the intermediary secret before authorizing', async () => {
    const response = await request.get('/api/auth');

    expect(response.status).to.equal(302);
  });

  after(() => nock.cleanAll());
});
