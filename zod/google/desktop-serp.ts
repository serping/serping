import { z } from 'zod';
import {
  SerpMetaSchema,
  SerpItemSourceSchema,
  SerpAdsSchema,
  SerpTypeSchema,
  SerpRelatedTypeSchema,
  SerpKnowledgePanelTypeSchema
} from './base';
export { 
  SerpItemSourceSchema, 
  SerpAdsSchema, 
  SerpTypeSchema, 
  SerpRelatedTypeSchema, 
  SerpKnowledgePanelTypeSchema, 
};
export { 
  SerpItemSource, 
  SerpAds, 
  SerpType, 
  SerpRelatedType,
  SerpKnowledgePanelType
} from "./base"; 



/////////////////////////////////////////
// SerpFromSourcesAcrossTheWeb
/////////////////////////////////////////

export const SerpFromSourcesAcrossTheWebSchema = z.object({
  type: SerpTypeSchema,
  from_sources_across_the_web: z.array(z.object({
    title: z.string(),
    items: z.array(z.object({
      position: z.number(),
      name: z.string(),
      thumbnail: z.string(),
      data_attrid: z.string(),
    })),
  })).optional()
});
export type SerpFromSourcesAcrossTheWeb = z.infer<typeof SerpFromSourcesAcrossTheWebSchema>;


/////////////////////////////////////////
// SerpDiscussionsAndForums
/////////////////////////////////////////

export const SerpDiscussionsAndForumsSchema = z.object({
  type: SerpTypeSchema,
  discussions_and_forums: z.array(z.object({
    position: z.number(),
    title: z.string(),
    link: z.string(),
    snippet: z.string().optional(),
    extensions: z.string(),
    source: z.string()
  })),
});
export type SerpDiscussionsAndForums = z.infer<typeof SerpDiscussionsAndForumsSchema>;
 
/////////////////////////////////////////
// SerpImages
/////////////////////////////////////////

export const SerpImagesSchema = z.object({
  type: SerpTypeSchema,
  related_keywords: z.array(
    z.object({
      short: z.string(),
      query: z.string(),
      thumbnail: z.string(),
    })
  ).optional(),
  posts: z.array(
    z.object(
      {
        position: z.number(),
        title: z.string(),
        thumbnail: z.string(),
        source: z.object({
          name: z.string(),
          link: z.string(),
        }),
        query: z.string()
      }
    )
  )
})
export type SerpImages = z.infer<typeof SerpImagesSchema>;


/////////////////////////////////////////
// SerpRecipes
/////////////////////////////////////////

export const SerpRecipesSchema = z.object({
  type: SerpTypeSchema,
  recipes: z.array(
    z.object({
      position: z.number(),
      title: z.string(),
      source: z.string(),
      ingredients: z.array(z.string()),
      total_time: z.string().optional(),
      rating: z.number().optional(),
      reviews: z.number().optional(),
      reviews_origin: z.string().optional(),
      link: z.string(),
      thumbnail: z.string(),
    })
  )
});

export type SerpRecipes = z.infer<typeof SerpRecipesSchema>;

/////////////////////////////////////////
// SerpPeopleAlsoAsk
/////////////////////////////////////////

export const SerpPeopleAlsoAskSchema = z.object({
  type: SerpTypeSchema,
  people_also_ask: z.array(z.object({
    position: z.number(),
    question: z.string(),
    snippet: z.string(),
    source: z.object({
      title: z.string(),
      name: z.string(),
      display_link: z.string(),
      link: z.string(),
    })
  })).optional()
})

export type SerpPeopleAlsoAsk = z.infer<typeof SerpPeopleAlsoAskSchema>;

/////////////////////////////////////////
// SerpSiteLinks
/////////////////////////////////////////

export const SerpSiteLinksSchema = z.object({
  type: SerpTypeSchema,
  title: z.string(),
  snippet: z.string(),
  source: SerpItemSourceSchema,
  links: z.array(z.object({
    title: z.string(),
    snippet: z.string(),
    link: z.string()
  }))
})
export type SerpSiteLinks = z.infer<typeof SerpSiteLinksSchema>;

/////////////////////////////////////////
// SerpTwitterSchema
/////////////////////////////////////////

export const SerpTwitterSchema = z.object({
  type: SerpTypeSchema,
  posts: z.array(z.object({
    link: z.string(),
    snippet: z.string(),
    posted_on: z.string(),
  })),
  source: z.object({
    name: z.string(),
    display_link: z.string(),
    link: z.string(),
  })
})
export type SerpTwitter = z.infer<typeof SerpTwitterSchema>;

/////////////////////////////////////////
// SerpStories
/////////////////////////////////////////

export const SerpStoriesSchema = z.object({
  type: SerpTypeSchema,
  top_stories: z.array(z.object({
    position: z.number(),
    source: z.string(),
    title: z.string().optional(),
    thumbnail: z.string(),
    date: z.string(),
  }))
})
export type SerpStories = z.infer<typeof SerpStoriesSchema>;
 
/////////////////////////////////////////
// SerpPerspectives
/////////////////////////////////////////

export const SerpPerspectivesSchema = z.object({
  type: SerpTypeSchema,
  perspectives: z.array(z.object({
    type: z.enum(["reddit", "normal"]), // reddit untest
    position: z.number(),
    author: z.string(),
    title: z.string(),
    thumbnail: z.string(),
    date: z.string(),
    snippet: z.string(),
    source: z.object({
      name: z.string(),
      creator: z.string(),
      link: z.string(),
    })
  }))
})
export type SerpPerspectives = z.infer<typeof SerpPerspectivesSchema>;

/////////////////////////////////////////
// SerpKeyMoment
/////////////////////////////////////////
export const SerpKeyMomentSchema = z.object({
  title: z.string(),
  time: z.string(),
  link: z.string(),
  thumbnail: z.string(),
});
export type SerpKeyMoment = z.infer<typeof SerpKeyMomentSchema>;

export const SerpInlineVideosSchema = z.object({
  type: SerpTypeSchema,
  inline_videos: z.array(z.object({
    position: z.number(),
    title: z.string(),
    duration: z.string(),
    date: z.string().optional(),
    thumbnail: z.string(),
    source: z.object({
      name: z.string(),
      creator: z.string(),
      link: z.string(),
    }),
    key_moments: z.array(SerpKeyMomentSchema).optional()
  }))
})
export type SerpInlineVideos = z.infer<typeof SerpInlineVideosSchema>;

/////////////////////////////////////////
// SerpVideo
/////////////////////////////////////////

export const SerpVideoSchema = z.object({
  type: SerpTypeSchema,
  position: z.number(),
  title: z.string(),
  snippet: z.string(),
  duration: z.string(),
  thumbnail: z.string(),
  source: z.object({
    name: z.string(),
    creator: z.string(),
    link: z.string(),
  }),
  key_moments: z.array(SerpKeyMomentSchema)
})
export type SerpVideo = z.infer<typeof SerpVideoSchema>;

/////////////////////////////////////////
// SerpNormal 
/////////////////////////////////////////

export const SerpNormalSchema = z.object({
  type: SerpTypeSchema,
  position: z.number(),
  title: z.string(),
  snippet: z.string(),
  date: z.string().optional(),
  thumbnail: z.string().optional(),
  source: z.object({
    title: z.string(),
    name: z.string(),
    display_link: z.string(),
    link: z.string(),
  }),
  snippet_highlighted_words: z.array(z.string()).optional(),
  rich_snippet: z.object({
    rated: z.object({
      label: z.string(),
      type: z.enum(["store", "normal"]),
      display_price: z.string().optional(),
      rating: z.number(),
      reviews: z.number(),
      reviews_origin: z.string()
    }),
    extensions: z.string()
  }).optional(),
  links: z.array(z.object({
    title: z.string(),
    link: z.string(),
  })).optional(),
  answers: z.array(z.object({
    count: z.number(),
    top_answer: z.string()
  })).optional(),
  more_results: z.array(z.object({
    title: z.string(),
    link: z.string(),
    date: z.string(),
  })).optional()
})
export type SerpNormal = z.infer<typeof SerpNormalSchema>;

 
/////////////////////////////////////////
// SerpThingsToKnow 
/////////////////////////////////////////

export const SerpThingsToKnowSchema = z.object({
  type: SerpTypeSchema,
  things_to_know: z.array(z.object({
    position: z.number(),
    heading: z.object({
      primary: z.string(),
      secondary: z.string(),
    }),
    answer: z.string().optional(), // same as title; when heading.secondary is a question, the answer field will appear
    title: z.string(),
    snippet: z.string(),
    date: z.string().optional(),
    source: z.object({
      title: z.string(),
      name: z.string(),
      link: z.string(),
      display_link: z.string(),
    })
  }))
})

export type SerpThingsToKnow = z.infer<typeof SerpThingsToKnowSchema>; 

/////////////////////////////////////////
// SerpFeaturedList 
/////////////////////////////////////////

export const SerpFeaturedListSchema = z.object({
  type: SerpTypeSchema,
  snippet_title: z.string().optional(),
  snippet_list: z.array(z.object({
    position: z.number(),
    item: z.string(),
  })).optional(),
  images: z.array(z.object({
    thumbnail: z.string()
  })),
  source: SerpItemSourceSchema,
  snippet_highlighted_words: z.array(z.string()).optional()
})
export type SerpFeaturedList = z.infer<typeof SerpFeaturedListSchema>;

/////////////////////////////////////////
// SerpFeaturedNormal
/////////////////////////////////////////

export const SerpFeaturedNormalSchema = z.object({
  type: SerpTypeSchema,
  snippet: z.string(),
  date: z.string(),
  images: z.array(z.object({
    thumbnail: z.string()
  })).optional(),
  source: SerpItemSourceSchema,
  snippet_highlighted_words: z.array(z.string()).optional()
})

export type SerpFeaturedNormal = z.infer<typeof SerpFeaturedNormalSchema>;


/////////////////////////////////////////
// SerpFeaturedSnippets
/////////////////////////////////////////

export const SerpFeaturedSnippetsSchema = z.object({
  type: SerpTypeSchema,
  featured_snippets: z.union([SerpFeaturedNormalSchema, SerpFeaturedListSchema])
})
export type SerpFeaturedSnippets = z.infer<typeof SerpFeaturedSnippetsSchema>;

 

/////////////////////////////////////////
// SerpLocalResults
///////////////////////////////////////// 

const SerpLocalResultsSchema = z.object({
  more_locations_link: z.string(),
  places: z.array(
    z.object(
      {
        title: z.string(),
        type: z.string(),
        position: z.number(),
        lsig: z.string(),
        place_id: z.string(),
        address: z.string(),
        hours: z.string().optional(),
        description: z.string(),
        rating: z.number().optional(),
        reviews: z.number().optional(),
        reviews_origin: z.string().optional(),
        thumbnail: z.string().optional(),
        website: z.string().optional(),
        directions: z.string().optional(),
      }
    )
  )
});

export type SerpLocalResults = z.infer<typeof SerpLocalResultsSchema>;


export const SerpQueryWithThumSchema = z.object({
  query: z.string(),
  thumbnail: z.string()
})
export type SerpQueryWithThum = z.infer<typeof SerpQueryWithThumSchema>;

const SerpPeopleAlsoSearchForSchema = z.object({
  type: SerpRelatedTypeSchema,
  people_also_search_for: z.array(SerpQueryWithThumSchema)
})
export type SerpPeopleAlsoSearchFor = z.infer<typeof SerpPeopleAlsoSearchForSchema>;

/////////////////////////////////////////
// RelatedVideos
/////////////////////////////////////////

export const RelatedVideosSchema = z.object({
  type: SerpRelatedTypeSchema,
  videos: z.object({
    title: z.string(),
    thumbnail: z.string(),
    items: z.array(z.object({
      title: z.string(),
      creator: z.string(),
      source: z.string(),
      date: z.string(),
      thumbnail: z.string(),
      duration: z.string(),
    })),
  })
})
export type RelatedVideos = z.infer<typeof RelatedVideosSchema>;

/////////////////////////////////////////
// RelatedNormal
/////////////////////////////////////////

export const RelatedNormalSchema = z.object({
  type: SerpRelatedTypeSchema,
  searches: z.array(z.string()),
})
export type RelatedNormal = z.infer<typeof RelatedNormalSchema>;


/////////////////////////////////////////
// RelatedNear
/////////////////////////////////////////

export const RelatedNearSchema = z.object({
  type: SerpRelatedTypeSchema,
  near: z.array(z.object({
    query: z.string(),
    thumbnail: z.string()
  })),
})
export type RelatedNear = z.infer<typeof RelatedNearSchema>;

export const RelatedSearchesSchema = z.array(z.union([
  RelatedNormalSchema,
  RelatedNearSchema,
  RelatedVideosSchema,
  SerpPeopleAlsoSearchForSchema,
]));
export type RelatedSearches = z.infer<typeof RelatedNearSchema>;




/////////////////////////////////////////
// SerpOriginSearch
/////////////////////////////////////////

const SerpOriginSearchSchema = z.union(
  [
    SerpNormalSchema,
    SerpRecipesSchema,
    SerpImagesSchema,
    SerpPeopleAlsoAskSchema,
    SerpSiteLinksSchema,
    SerpTwitterSchema,
    SerpVideoSchema,
    SerpInlineVideosSchema,
    SerpStoriesSchema,
    SerpPerspectivesSchema,
    SerpThingsToKnowSchema,
    SerpFeaturedSnippetsSchema,
    SerpDiscussionsAndForumsSchema,
    SerpFromSourcesAcrossTheWebSchema,
  ]
);
export type SerpOriginSearch = z.infer<typeof SerpOriginSearchSchema>;


/////////////////////////////////////////
// SerpKnowledgeInfo
/////////////////////////////////////////

const SerpKnowledgeInfoSchema = z.object({
  heading: z.string(),
  subheading: z.string(),
  posts: z.array(z.object({
    link: z.string(),
    display_link: z.string().optional(),
    title: z.string(),
    snippet: z.string(),
    thumbnail: z.string().optional(),
    source: z.string().optional(),
  }))
});
export type SerpKnowledgeInfo = z.infer<typeof SerpKnowledgeInfoSchema>;


/////////////////////////////////////////
// SerpKnowledgeAds
/////////////////////////////////////////

const SerpKnowledgeAdsSchema = z.object({
  type: SerpKnowledgePanelTypeSchema,
  ads: z.array(z.object({
    position: z.number(),
    name: z.string(),
    link: z.string(),
    source: z.string(),
    thumbnail: z.string(),
  }))
})
export type SerpKnowledgeAds = z.infer<typeof SerpKnowledgeAdsSchema>;

/////////////////////////////////////////
// SerpKnowledgeNormal
/////////////////////////////////////////

const SerpKnowledgeNormalSchema = z.object({
  type: SerpKnowledgePanelTypeSchema,
  infos: z.array(SerpKnowledgeInfoSchema)
});
export type SerpKnowledgeNormal = z.infer<typeof SerpKnowledgeNormalSchema>;


/////////////////////////////////////////
// SerpFoods
/////////////////////////////////////////

const SerpFoodsSchema = z.object({
  type: SerpKnowledgePanelTypeSchema,
  foods: z.object({
    heading: z.string(),
    description: z.string(),
    source: z.object({
      name: z.string(),
      link: z.string(),
    })
  }),
  images: z.array(z.object({
    lpage: z.string(),
    thumbnail: z.string()
  })).optional(),
  people_also_search_for: z.array(z.object({
    name: z.string(),
    thumbnail: z.string(),
  })).optional()
});
export type SerpFoods = z.infer<typeof SerpFoodsSchema>;


/////////////////////////////////////////
// SerpKnowledgePanel
/////////////////////////////////////////

const SerpProfileSchema = z.object({
  title: z.string(),
  thumbnail: z.string().optional(),
  link: z.string(),
})
export type SerpProfile = z.infer<typeof SerpProfileSchema>;

const SerpKnowledgeSchema = z.object({
  type: SerpKnowledgePanelTypeSchema, 
  site: z.string(),
  organization_type: z.string(),
  description: z.string(),
  title: z.string(),
  thumbnail: z.string().optional(),
  thumbnail_lpage: z.string().optional(),
  source: z.object({
    name: z.string(),
    link: z.string(),
  }),
  attributes: z.array(z.object({
    name: z.string(),
    value: z.string(),
  })).optional(),
  profiles: z.array(SerpProfileSchema).optional(),
  infos: z.array(SerpKnowledgeInfoSchema).optional() 
})
export type SerpKnowledge = z.infer<typeof SerpKnowledgeSchema>;

/////////////////////////////////////////
// SerpKnowledgePanel
/////////////////////////////////////////

const SerpKnowledgePanelSchema = z.union([
  SerpKnowledgeAdsSchema,
  SerpFoodsSchema,
  SerpKnowledgeSchema,
  SerpKnowledgeNormalSchema,
]);

export type SerpKnowledgePanel = z.infer<typeof SerpKnowledgePanelSchema>;


/////////////////////////////////////////
// SerpJSON
/////////////////////////////////////////

export const SerpJsonSchema = z.object({
  meta: SerpMetaSchema,
  topads: z.array(SerpAdsSchema),
  local_results: SerpLocalResultsSchema.nullable(),
  origin_search: z.array(SerpOriginSearchSchema),
  knowledge_panel: z.array(SerpKnowledgePanelSchema),
  bottomads: z.array(SerpAdsSchema),
  related_searches: RelatedSearchesSchema
})

export type SerpJSON = z.infer<typeof SerpJsonSchema>;

export type SerpColumn = SerpJSON["origin_search"][number] | {
  type: "local_results",
  local_results: SerpJSON["local_results"]
} | {
  type: "related_searches",
  related_searches: SerpJSON["related_searches"]
}