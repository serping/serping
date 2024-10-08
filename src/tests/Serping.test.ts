import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SerpingConfig } from '@/types'; 
import Serping from '@/index'; 
import { desktopOpenai } from '@tests/data/google/serp/desktop'; 

jest.spyOn(axios, "get");

describe('Serping', () => {
  let serping: Serping;
  let mockAxios: MockAdapter;
  const defaultConfig: SerpingConfig = { region: 'us-east-1', apiKey: process.env.SERPING_US_EAST_1_API_KEY! };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    serping = new Serping(defaultConfig);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should fetch Google SERP data successfully', async () => {
    const mockResponse = desktopOpenai;
    mockAxios.onGet('google/serp').reply(200, mockResponse);

    const result = await serping.googleSerp({ q: 'test query' });

    expect(result).toEqual(mockResponse);
  });

  it('should handle 403 error from API', async () => {
    const mockErrorResponse = { error: 'Unauthorized', message: 'x-api-key not match' };
    mockAxios.onGet('google/serp').reply(403, mockErrorResponse);

    await expect(serping.googleSerp({ q: 'test query' })).rejects.toThrow('Unauthorized');
  });

  it('should throw error if query is empty', async () => {
    await expect(serping.googleSerp({ q: '' })).rejects.toThrow('query is empty');
  });
});
