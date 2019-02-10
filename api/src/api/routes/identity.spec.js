const nock = require('nock');
const { expect } = require('chai');

const app = require('../../../app');
const request = require('supertest').agent(app.listen());

const identityResponse = require('../../../fixtures/identity.json');

describe('/api/identity', () => {
  before(() => {
    nock('https://api.discogs.com/')
      .get('/oauth/identity')
      .reply(200, identityResponse);
  });

  it('should return an empty username if not authenticated', async () => {
    const response = await request.get('/api/identity');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ username: '' });
  });

  it('should return a username if authenticated', async () => {
    const response = await request.get('/api/identity')
      .set('Cookie', ['authToken={"oauth_token": "abc123", "oauth_token_secret": "xyz789"}']);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ username: 'example' });
  });

  after(() => nock.cleanAll());
});
