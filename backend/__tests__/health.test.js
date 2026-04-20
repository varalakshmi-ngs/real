const request = require('supertest');
const app = require('../server.js');

describe('GET /health', () => {
  it('should return status OK', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });
});