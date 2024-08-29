import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Serping from '@/index'; 
import { SerpingConfig } from '@/types'; 
import { dataParse } from "./parse";
import { desktopOpenai, desktopCoffee, desktopSeo, desktopVpn, desktopHowTo } from '@tests/data/google/serp/desktop'; 
import { desktopDeKw } from '@tests/data/google/serp/desktop/de-kw';
import { SerpJsonSchema } from '@/zod/google/desktop-serp';

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

  it('should fetch Google SERP data successfully: Seo services', async () => {
    const mockResponse = desktopSeo;
    mockAxios.onGet('google/serp').reply(200, mockResponse);
 
    const result = await serping.googleSerp({ q: 'Seo services' }); 
    dataParse(result);

    expect(result).toEqual(mockResponse);
  });

  it('should fetch Google SERP data successfully: How to do SEO for beginners', async () => {
    const mockResponse = desktopHowTo;
    mockAxios.onGet('google/serp').reply(200, mockResponse);
 
    const result = await serping.googleSerp({ q: 'How to do SEO for beginners' }); 
    dataParse(result);

    expect(result).toEqual(mockResponse);
  });


  it('should fetch Google SERP data successfully: VPN', async () => {
    const mockResponse = desktopVpn;
    mockAxios.onGet('google/serp').reply(200, mockResponse);
 
    const result = await serping.googleSerp({ q: 'VPN' }); 
    dataParse(result);

    expect(result).toEqual(mockResponse);
  });

  it('Küchenplaner Hannover', async () => {
    const mockResponse = desktopDeKw;
    mockAxios.onGet('google/serp').reply(200, mockResponse);

    const result = await serping.googleSerp({ q: 'Küchenplaner Hannover' }); 
    dataParse(result);

    expect(result).toEqual(mockResponse);
  });

 
});
