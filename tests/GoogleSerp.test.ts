import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Serping from '../index'; 
import { SerpingConfig } from '../types'; 
import { SerpJsonSchema } from '../zod/google/desktop-serp'; 
import { desktopOpenai } from './data/google/serp/desktop'; 

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

  it('should fetch Google SERP data successfully', async () => {
    const mockResponse = desktopOpenai;
    mockAxios.onGet('google/serp').reply(200, mockResponse);

    const result = await serping.googleSerp({ q: 'test query' });
    try {
      SerpJsonSchema.parse(result)
    }catch(error: any){
      console.log("error", error)
    }

    expect(result).toEqual(mockResponse);
  });

 
});
