import supertest from 'supertest';
import { CustomApiResponse } from '../../src/interfaces/commonApi';
import app from '../../src/config/server/server'


const server = app();
const request = supertest(server);

describe('Integration Test - episode-location-controller', () => {
  let response: CustomApiResponse;
  it('should response status 200 and Content-Type application/json', async () => {
    response = await request.get('/api/v1/episode')
    expect(typeof response.status).toBe('number')
    expect(response.body.in_time).toBe(true)
    
  });
  it('should response a JSON in less than 3 seconds', async () => {
    response = await request.get('/api/v1/episode')
    expect(typeof response.body).toBe(typeof JSON);
    expect(response.body.in_time).toBe(true);
  });
  it('should response the exercise name, and an array of results', async () => {
    response = await request.get('/api/v1/episode')
    expect(response.body.exercise_name).toBe('Episode locations');
    expect(Array.isArray(response.body.results)).toBe(true);
  });
  
});

