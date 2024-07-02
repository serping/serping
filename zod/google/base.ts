import { z } from 'zod';

const serpTypes = ['normal', 'recipes', 'images', 'people_also_ask', 'things_to_know', 'perspectives', 'top_stories', 'twitter', 'site_links', 'inline_videos', 'video', 'featured_snippets', 'from_sources_across_the_web', 'discussions_and_forums', 'related_searches'] as const;
const serpRelatedTypes = ['normal', 'videos', 'people_also_search_for', 'near'] as const;
const serpKnowledgePanelTypes = ['normal', 'knowledge', 'foods', 'ads'] as const;

export type SerpType = typeof serpTypes[number];
export type SerpRelatedType = typeof serpRelatedTypes[number];
export type SerpKnowledgePanelType = typeof serpKnowledgePanelTypes[number];
export const SerpTypeSchema = z.enum(serpTypes);
export const SerpRelatedTypeSchema = z.enum(serpRelatedTypes);
export const SerpKnowledgePanelTypeSchema = z.enum(serpKnowledgePanelTypes);

export const onOffStatusSchema = z.enum(["on", "off"]);
export type OnOffStatus = z.infer<typeof onOffStatusSchema>;

export const GoogleSerpSearchParamSchema =  z.object({
  q: z.string(),
  gl: z.string(),
  hl: z.string(),
  lsig: z.string().optional(),
  ludocid: z.string().optional(),
  uule: z.string().optional(),
  location: z.string().optional(),
  snapshot: onOffStatusSchema.optional().default("off"),
  thumbnail: onOffStatusSchema.optional().default("on"),
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
