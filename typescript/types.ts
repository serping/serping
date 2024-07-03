export const regions = ["us-east-1"] as const;
export type RegionType = typeof regions[number];
export type serpingApiConfig = {
  baseUrl: string;
  apiKey: string;
}
export type SerpingConfig = { region: RegionType, apiKey?: string};
export type SerpingApi = Record<RegionType, serpingApiConfig>;

 