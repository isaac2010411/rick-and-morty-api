import { GetResources } from '../../src/interfaces/commonApi';
import { getAllData } from '../../src/utils'

describe('Unit Test - getAllData/character', () => {
  let result : GetResources[]
  beforeAll(async()=>  result = await getAllData('/character'))
  it('should return properties resources.info', async () => {
  const { info } = result[0]
   expect(info).toHaveProperty('count');
   expect(info).toHaveProperty('pages');
   expect(info).toHaveProperty('next');
   expect(info).toHaveProperty('prev');
  });
  it('should return properties resources.characters', async () => {
    const { results } = result[0]
    expect(results[0]).toHaveProperty('id');
    expect(results[0]).toHaveProperty('name');
    expect(results[0]).toHaveProperty('origin');
    expect(Array.isArray(results)).toBe(true);
   });

});

