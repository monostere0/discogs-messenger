const app = require('../../../app');
const request = require('supertest').agent(app.listen());
const { expect } = require('chai');
const nock = require('nock');

const orderMessages = require('../../../fixtures/orderMessages.json');
const userDetails = require('../../../fixtures/userDetails.json');
const identityResponse = require('../../../fixtures/identity.json');

const ORDER_ID = '443312-22';

describe('/api/messages/', () => {
  before(() => {
    nock('https://api.discogs.com/')
      .get(`/marketplace/orders/${ORDER_ID}/messages`)
      .reply(200, orderMessages)
      .get('/oauth/identity')
      .reply(200, identityResponse)
      .get('/users/example_seller')
      .reply(200, userDetails);
  });

  it('should return 404 if param orderId is missing', async () => {
    const response = await request.get(`/api/messages`);

    expect(response.status).to.equal(404);
  });

  it('should return 403 if the user is not authenticated', async () => {
    const response = await request.get(`/api/messages/${ORDER_ID}/`);

    expect(response.status).to.equal(403);
  });

  it('should return the messages list', async () => {
    const response = await request.get(`/api/messages/${ORDER_ID}/`)
      .set('Cookie', ['authToken={"oauth_token": "abc123", "oauth_token_secret": "xyz789"}']);

    expect(response.status).to.equal(200);
    expect(response.body.length).to.equal(3);
    ['timestamp',
      'subject',
      'message',
      'type',
      'order',
      'avatar'].forEach(propName => {
        expect(response.body[0]).to.haveOwnProperty(propName);
      });
  });
});
