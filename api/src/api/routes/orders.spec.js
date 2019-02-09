const app = require('../../../app');
const request = require('supertest').agent(app.listen());
const { expect } = require('chai');
const nock = require('nock');

const ordersResponse = require('../../../fixtures/orders.json');
const userDetails = require('../../../fixtures/userDetails.json');


describe('/api/orders', () => {
  before(() => {
    nock('https://api.discogs.com/')
      .get('/marketplace/orders?status=Shipped')
      .reply(200, ordersResponse)
      .get('/users/example_buyer')
      .reply(200, userDetails);
  });

  it('should return 403 if the user is not authenticated', async () => {
    const response = await request.get('/api/orders');

    expect(response.status).to.equal(403);
  });

  it('should return the orders for a user', async () => {
    const response = await request.get('/api/orders')
      .set('Cookie', ['authToken={"oauth_token": "abc123", "oauth_token_secret": "xyz789"}']);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal([{
      id: '1-1',
      from: 'example_buyer',
      preview: 'Persuader, The - Stockholm (2x12")',
      timestamp: '2011-10-21T09:25:17-07:00',
      avatar: 'http://www.gravatar.com/avatar/55502f40dc8b7c769880b10874abc9d0?s=52&r=pg&d=mm'
    }]);
  });

  after(() => nock.cleanAll());
});
