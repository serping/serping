import { z } from 'zod';

export const OnOffStatusSchema = z.enum(["on", "off"]);
export type OnOffStatus = z.infer<typeof OnOffStatusSchema>;

export const GoogleSerpSearchParamSchema =  z.object({
  q: z.string(),
  gl: z.string(),
  hl: z.string(),
  lsig: z.string().optional(),
  ludocid: z.string().optional(),
  uule: z.string().optional(),
  location: z.string().optional(),
  snapshot: OnOffStatusSchema.optional().default("off"),
  thumbnail: OnOffStatusSchema.optional().default("on"),
  num: z.number().min(10).max(100),
  page: z.number().min(1).max(100)
});

export type GoogleSerpSearchParam = z.infer<typeof GoogleSerpSearchParamSchema>;


/////////////////////////////////////////
// SerpMeta
/////////////////////////////////////////

export const SerpMetaSchema = z.object({
  url: z.string().optional(),
  snapshot: z.string().optional(),
  serpjson: z.string().optional(),
  parse_duration: z.string().optional(),
  search_params: z.any(),
  result_stats: z.object({
    total_results: z.string(),
    time_taken_displayed: z.string(),
  }).optional(),
});

export type SerpMeta = z.infer<typeof SerpMetaSchema>;


/////////////////////////////////////////
// SerpItemSource
/////////////////////////////////////////

export const SerpItemSourceSchema = z.object({
  title: z.string(),
  name: z.string(),
  link: z.string(),
  display_link: z.string()
})
export type SerpItemSource = z.infer<typeof SerpItemSourceSchema>;



/////////////////////////////////////////
// SerpAds
/////////////////////////////////////////

export const SerpAdsSchema = z.object({
  title: z.string(),
  snippet: z.string(),
  source: z.object({
    link: z.string(),
    display_link: z.string(),
    name: z.string()
  })
})
export type SerpAds = z.infer<typeof SerpAdsSchema>;


/////////////////////////////////////////
// SerpPeopleAlsoSearchFor
/////////////////////////////////////////

export const SerpPeopleAlsoSearchForSchema = z.object({
  type: z.literal("people_also_search_for"),
  people_also_search_for: z.array(z.object({
    query: z.string(),
    thumbnail: z.string()
  }))
})
export type SerpPeopleAlsoSearchFor = z.infer<typeof SerpPeopleAlsoSearchForSchema>;
