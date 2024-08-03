import { regions, type SerpingApi } from './types';
import { GoogleSearchType, GoogleTbm } from './zod/google/base';

const googleTbmMaps: Record<GoogleTbm, GoogleSearchType> = {
  vid: "video"
};

const config = {
  regions,
  google:{
    tbmMaps: googleTbmMaps
  },
  serpingApi: {
    "us-east-1": {
      baseUrl: "https://us-east-1.serp.ing",
      apiKey: process.env.SERPING_US_EAST_1_API_KEY!
    }
  } as SerpingApi
}

export default config;