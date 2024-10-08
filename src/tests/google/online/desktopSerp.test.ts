
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
    const id = data.meta.snapshot_id; 
    expect(!!id).toBe(true);
    if(id){
      const snapshot = await serping.googleSerpSnapshot({id});
      expect(/html/.test(snapshot)).toBe(true);
    }
    expect(data?.origin_search.results.length ).toBeGreaterThan(0);
  }, 15_000);

  it('should fetch Google SERP data successfully: coffee', async () => {
    const result = await serping.googleSerp({ q: 'coffee', snapshot: "on" });
    const data = dataParse(result);
    const id = data.meta.snapshot_id; 
    expect(!!id).toBe(true);
    expect(data?.origin_search.results.length).toBeGreaterThan(0)
  }, 15_000);


  it('Google Video data successfully: coffee', async () => {
    const result = await serping.googleSerp({ q: 'coffee', snapshot: "on", tbm: 'vid' });
    const data = result;
    // console.log('data', JSON.stringify(data, null, 2))
    const id = data.meta.snapshot_id; 
    expect(!!id).toBe(true);
    expect(data?.origin_search.results.length).toBeGreaterThan(0)
  }, 15_000);

 
});
