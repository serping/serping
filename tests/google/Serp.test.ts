import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Serping from '../../index'; 
import { SerpingConfig } from '../../types'; 
import { SerpJsonSchema } from '../../zod/google/desktop-serp'; 
import { desktopOpenai, desktopCoffee } from '../data/google/serp/desktop'; 

jest.spyOn(axios, "get");

describe('GoogleSerp', () => {
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

  it('should fetch Google SERP data successfully: openai', async () => {
    const mockResponse = desktopOpenai;
    mockAxios.onGet('google/serp').reply(200, mockResponse);

    const result = await serping.googleSerp({ q: 'openai' });
    SerpJsonSchema.parse(result)

    expect(result).toEqual(mockResponse);
  });

  it('should fetch Google SERP data successfully: coffee', async () => {
    const mockResponse = desktopCoffee;
    mockAxios.onGet('google/serp').reply(200, mockResponse);

    const result = await serping.googleSerp({ q: 'coffee' }); 
    SerpJsonSchema.parse(result);

    expect(result).toEqual(mockResponse);
  });

 
});
