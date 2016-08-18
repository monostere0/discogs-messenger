const app = require('../../../app');
const request = require('supertest').agent(app.listen());
const expect = require('chai').expect;

describe('orders endpoint', () => {
  it('should return 403 if you\'re not authenticated', function *() {
    const response = yield request.get('/api/orders');

    expect(response.status).to.equal(403);
  });
});
