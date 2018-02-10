const app = require('../../../app');
const request = require('supertest').agent(app.listen());
const expect = require('chai').expect;

describe('Api entry point', () => {
  it('should return entry point response', async () => {
    const response = await request.get('/api');

    expect(response.status).to.equal(200);
    expect(response.text).to.equal('API Entry point');
  });
});
