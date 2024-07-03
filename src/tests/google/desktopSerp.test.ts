import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Serping from '@/index'; 
import { SerpingConfig } from '@/types'; 
import { dataParse } from "./parse";
import { desktopOpenai, desktopCoffee } from '@tests/data/google/serp/desktop'; 

jest.spyOn(axios, "get");


describe('GoogleDesktopSerp.test', () => {
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
    dataParse(result);
    expect(result).toEqual(mockResponse);
  });

  it('should fetch Google SERP data successfully: coffee', async () => {
    const mockResponse = desktopCoffee;
    mockAxios.onGet('google/serp').reply(200, mockResponse);

    const result = await serping.googleSerp({ q: 'coffee' }); 
    dataParse(result);

    expect(result).toEqual(mockResponse);
  });

 
});
