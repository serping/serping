import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Serping from '@/index'; 
import { SerpingConfig } from '@/types'; 
import { dataParse } from "./parse";
import { desktopOpenai, desktopCoffee, desktopSeo } from '@tests/data/google/serp/desktop'; 

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

    /**
     * test: 10 results
     * 
     * 
     * 
     * origin_search:
     * 
     * - normal
     * - site_links
     * 
     * related_searches:
     * 
     * - normal
     * 
     */
    const result = await serping.googleSerp({ q: 'openai' });
    dataParse(result);
    expect(result).toEqual(mockResponse);
  });

  it('should fetch Google SERP data successfully: coffee', async () => {
    const mockResponse = desktopCoffee;
    mockAxios.onGet('google/serp').reply(200, mockResponse);

    /**
     * local_results:
     * 
     * - directions
     *  places:
     *  - normal
     * 
     * origin_search:
     * 
     * - normal
     * - people_also_ask
     * - recipes
     * 
     * knowledge_panel:
     * 
     * - knowledge:
     *  
     *    - attributes
     *    - profiles
     *    - people_also_search_for
     * 
     */
    
    const result = await serping.googleSerp({ q: 'coffee' }); 
    dataParse(result);

    expect(result).toEqual(mockResponse);
  });

  it('should fetch Google SERP data successfully: Seo services', async () => {
    const mockResponse = desktopSeo;
    mockAxios.onGet('google/serp').reply(200, mockResponse);

    /**
     * test: 100 results
     * 
     * topads
     * 
     * 
     * local_results: 
     * 
     * - services
     * 
     * 
     * origin_search:
     * 
     * - normal
     * - people_also_ask
     * - things_to_know
     * - book
     * 
     * 
     * related_searches:
     * - normal
     * 
     */
    const result = await serping.googleSerp({ q: 'Seo services' }); 
    dataParse(result);

    expect(result).toEqual(mockResponse);
  });

 
});
