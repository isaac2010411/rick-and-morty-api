import { GetResources } from '../../src/interfaces/commonApi';
import { getAllData } from '../../src/utils'

describe('Unit Test - getAllData/episode', () => {
  let result : GetResources[]
  beforeAll(async()=>  result = await getAllData('/episode'))
  it('should return properties resources.episode', async () => {
    const { results } = result[0]
    expect(Array.isArray(results)).toBe(true);
    expect(results[0]).toHaveProperty('id');
    expect(results[0]).toHaveProperty('name');
    expect(results[0]).toHaveProperty('episode');
    expect(results[0]).toHaveProperty('characters');
   });
});

