import supertest from 'supertest';
import { CustomApiResponse } from '../../src/interfaces/commonApi';
import app from '../../src/config/server/server'


const server = app();
const request = supertest(server);

describe('Integration Test - charCounterController', () => {
  let response: CustomApiResponse;
  it('should response status 200', async () => {
    response = await request.get('/api/v1/char')
    expect(response.status).toBe(200);
  });
  it('should response a JSON in less than 3 seconds', async () => {
    response = await request.get('/api/v1/char')
    expect(typeof response.body).toBe(typeof JSON);
    expect(response.body.in_time).toBe(true);
  });
  it('should response the exercise name, and an array of results', async () => {
      response = await request.get('/api/v1/char')
    expect(response.body.exercise_name).toBe('Char counter');
    expect(Array.isArray(response.body.results)).toBe(true);
  });
  it('should fail because it expected the wrong value', async () => {
    response = await request.get('/api/v1/char')
    expect(response.status).toBe(100);
  });
});

