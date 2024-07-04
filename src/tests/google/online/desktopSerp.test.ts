
import Serping from '@/index'; 
import { SerpingConfig } from '@/types'; 
import { dataParse } from "../parse";

describe('GoogleDesktopSerp.test', () => {
  let serping: Serping; 
  const defaultConfig: SerpingConfig = { region: 'us-east-1', apiKey: process.env.SERPING_US_EAST_1_API_KEY! };

  beforeEach(() => { 
    serping = new Serping(defaultConfig);
  });

  it('should fetch Google SERP data successfully: openai', async () => {
    const result = await serping.googleSerp({ q: 'openai', snapshot: "on" });
    const data = dataParse(result);
    expect(data?.origin_search.results.length ).toBeGreaterThan(0);
  }, 15_000);

  it('should fetch Google SERP data successfully: coffee', async () => {
    const result = await serping.googleSerp({ q: 'coffee', snapshot: "on" });
    const data = dataParse(result);
    expect(data?.origin_search.results.length ).toBeGreaterThan(0)
  }, 15_000);

 
});
