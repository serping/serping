import { regions, type SerpingApi } from './types';

const config = {
  regions,
  serpingApi: {
    "us-east-1": {
      baseUrl: "https://us-east-1.serp.ing",
      apiKey: process.env.SERPING_US_EAST_1_API_KEY!
    }
  } as SerpingApi
}

export default config;