import { GetResources } from '../../src/interfaces/commonApi';
import {getAllData} from '../../src/utils'

describe('Unit Test - getAllData/location', () => {
  let result : GetResources[]
  beforeAll(async()=>  result = await getAllData('/location'))
  it('should return properties resources.location', async () => {
    const { results } = result[0]
    expect(results[0]).toHaveProperty('id');
    expect(results[0]).toHaveProperty('name');
    expect(results[0]).toHaveProperty('dimension');
    expect(results[0]).toHaveProperty('residents');
    expect(Array.isArray(results)).toBe(true);
   
   });

});
