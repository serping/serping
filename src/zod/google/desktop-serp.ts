import { z } from 'zod';
export const serpTypes = ['normal', 'recipes', 'inline_images', 'people_also_ask', 'things_to_know', 'perspectives', 'top_stories', 'twitter', 'site_links', 'inline_videos', 'video', 'featured_snippets', 'from_sources_across_the_web', 'discussions_and_forums'] as const;
export const serpRelatedTypes = ['normal', 'videos', 'people_also_search_for', 'near'] as const;
export const serpKnowledgePanelTypes = ['normal', 'knowledge', 'foods', 'ads'] as const;
export const SerpColumnTypeTypes = [...serpTypes, "related_searches", "local_results", "topads", "bottomads"] as const;
 
export type SerpType = typeof serpTypes[number];
export type SerpColumnType = typeof SerpColumnTypeTypes[number];
export type SerpRelatedType = typeof serpRelatedTypes[number];
export type SerpKnowledgePanelType = typeof serpKnowledgePanelTypes[number];

export const SerpTypeSchema = z.enum(serpTypes);
export const SerpColumnTypeSchema = z.enum(SerpColumnTypeTypes);
export const SerpRelatedTypeSchema = z.enum(serpRelatedTypes);
export const SerpKnowledgePanelTypeSchema = z.enum(serpKnowledgePanelTypes);

import {
  SerpMetaSchema,
  SerpItemSourceSchema,
  SerpAdsSchema, 
  SerpPeopleAlsoSearchForSchema
} from './base';
export { 
  SerpItemSourceSchema, 
  SerpAdsSchema,  
  SerpPeopleAlsoSearchForSchema
};
export { 
  SerpItemSource, 
  SerpAds,  
  SerpPeopleAlsoSearchFor
} from "./base"; 



/////////////////////////////////////////
// SerpFromSourcesAcrossTheWeb
/////////////////////////////////////////

export const SerpFromSourcesAcrossTheWebSchema = z.object({
  type: z.literal("from_sources_across_the_web"),
  from_sources_across_the_web: z.array(z.object({
    title: z.string(),
    items: z.array(z.object({
      position: z.number(),
      name: z.string(),
      thumbnail: z.string(),
      data_attrid: z.string(),
    })),
  }))
});
export type SerpFromSourcesAcrossTheWeb = z.infer<typeof SerpFromSourcesAcrossTheWebSchema>;


/////////////////////////////////////////
// SerpDiscussionsAndForums
/////////////////////////////////////////

export const SerpDiscussionsAndForumsSchema = z.object({
  type: z.literal("discussions_and_forums"),
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
// SerpInlineImages
/////////////////////////////////////////

export const SerpInlineImagesSchema = z.object({
  type: z.literal("inline_mages"),
  related_keywords: z.array(
    z.object({
      short: z.string(),
      query: z.string(),
      thumbnail: z.string(),
    })
  ).optional(),
  collection: z.array(
    z.object(
      {
        position: z.number(),
        query: z.string(),
        title: z.string(),
        thumbnail: z.string(),
        source: z.object({
          name: z.string(),
          lpage: z.string(),
        })
      }
    )
  )
})
export type SerpInlineImages = z.infer<typeof SerpInlineImagesSchema>;


/////////////////////////////////////////
// SerpRecipes
/////////////////////////////////////////

export const SerpRecipesSchema = z.object({
  type: z.literal("recipes"),
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
  type: z.literal("people_also_ask"),
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
  }))
})

export type SerpPeopleAlsoAsk = z.infer<typeof SerpPeopleAlsoAskSchema>;

/////////////////////////////////////////
// SerpSiteLinks
/////////////////////////////////////////

export const SerpSiteLinksSchema = z.object({
  type: z.literal("site_links"),
  position: z.number(),
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
  type: z.literal("twitter"),
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
// SerpTopStorie
/////////////////////////////////////////

export const SerpTopStoriesSchema = z.object({
  type: z.literal("top_stories"),
  top_stories: z.object({
    heading: z.string(),
    stories: z.array(
      z.object({
        heading: z.string().optional(),
        posts: z.array(z.object({
          position: z.number(),
          title: z.string().optional(),
          thumbnail: z.string(),
          date: z.string(),
          source: z.object({
            name: z.string(),
            link: z.string()
          }),
        }))
      })
    )
  }) 
})
export type SerpTopStories = z.infer<typeof SerpTopStoriesSchema>;
 
/////////////////////////////////////////
// SerpPerspectives
/////////////////////////////////////////

export const SerpPerspectivesSchema = z.object({
  type: z.literal("perspectives"),
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
  type: z.literal("inline_videos"),
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
  type: z.literal("video"),
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
  type: z.literal("normal"),
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
  type: z.literal("things_to_know"),
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
  type: z.literal("featured_list"),
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
  type: z.literal("normal"),
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
  type: z.literal("featured_snippets"),
  featured_snippets: z.object({
    type: z.enum(["featured_list", "normal"])
  }).catchall(z.any())
})
export type SerpFeaturedSnippets = z.infer<typeof SerpFeaturedSnippetsSchema>;

 

/////////////////////////////////////////
// SerpLocalResults
///////////////////////////////////////// 

export const SerpLocalResultsSchema = z.object({
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


/////////////////////////////////////////
// SerpRelatedVideos
/////////////////////////////////////////

export const SerpRelatedVideosSchema = z.object({
  type: z.literal("videos"),
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
export type SerpRelatedVideos = z.infer<typeof SerpRelatedVideosSchema>;

/////////////////////////////////////////
// SerpRelatedNormal
/////////////////////////////////////////

export const SerpRelatedNormalSchema = z.object({
  type: z.literal("normal"),
  searches: z.array(z.string()),
})
export type SerpRelatedNormal = z.infer<typeof SerpRelatedNormalSchema>;


/////////////////////////////////////////
// SerpRelatedNear
/////////////////////////////////////////

export const SerpRelatedNearSchema = z.object({
  type: z.literal("near"),
  near: z.array(z.object({
    query: z.string(),
    thumbnail: z.string()
  })),
})
export type SerpRelatedNear = z.infer<typeof SerpRelatedNearSchema>;


/////////////////////////////////////////
// SerpRelatedSearchesSchema
// 
// SerpRelatedNormalSchema
// SerpRelatedNearSchema
// SerpRelatedVideosSchema
// SerpPeopleAlsoSearchForSchema
// 
/////////////////////////////////////////
export const SerpRelatedSearchesSchema = z.object({
    type: SerpRelatedTypeSchema
  }).catchall(z.any())
;
export type SerpRelatedSearches = z.infer<typeof SerpRelatedNearSchema>;




/////////////////////////////////////////
//  SerpOriginSearch
//  
//  SerpNormalSchema
//  SerpRecipesSchema
//  SerpInlineImagesSchema
//  SerpPeopleAlsoAskSchema
//  SerpSiteLinksSchema
//  SerpTwitterSchema
//  SerpVideoSchema
//  SerpInlineVideosSchema
//  SerpTopStoriesSchema
//  SerpPerspectivesSchema
//  SerpThingsToKnowSchema
//  SerpFeaturedSnippetsSchema
//  SerpDiscussionsAndForumsSchema
//  SerpFromSourcesAcrossTheWebSchema
//  
/////////////////////////////////////////

export const SerpOriginSearchSchema = z.object({
  type: SerpTypeSchema
}).catchall(z.any())

export type SerpOriginSearch = z.infer<typeof SerpOriginSearchSchema>;


/////////////////////////////////////////
// SerpKnowledgeInfo
/////////////////////////////////////////

export const SerpKnowledgeInfoSchema = z.object({
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

export const SerpKnowledgeAdsSchema = z.object({
  type: z.literal("ads"),
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

export const SerpKnowledgeNormalSchema = z.object({
  type: SerpKnowledgePanelTypeSchema,
  infos: z.array(SerpKnowledgeInfoSchema)
});
export type SerpKnowledgeNormal = z.infer<typeof SerpKnowledgeNormalSchema>;


/////////////////////////////////////////
// SerpFoods
/////////////////////////////////////////

export const SerpFoodsSchema = z.object({
  type: z.literal("foods"),
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

export const SerpProfileSchema = z.object({
  title: z.string(),
  thumbnail: z.string().optional(),
  link: z.string(),
})
export type SerpProfile = z.infer<typeof SerpProfileSchema>;

export const SerpKnowledgeSchema = z.object({
  type: z.literal("knowledge"), 
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
//
// SerpKnowledgeAdsSchema
// SerpFoodsSchema
// SerpKnowledgeSchema
// SerpKnowledgeNormalSchema
/////////////////////////////////////////

export const SerpKnowledgePanelSchema = z.object({
  type: SerpKnowledgePanelTypeSchema
}).catchall(z.any());

export type SerpKnowledgePanel = z.infer<typeof SerpKnowledgePanelSchema>;


/////////////////////////////////////////
// SerpJSON
/////////////////////////////////////////

export const SerpOriginSearchTypeSchema = z.enum(["normal", "tablist"]);
export type SerpOriginSearchType = z.infer<typeof SerpOriginSearchTypeSchema>;

export const SerpJsonSchema = z.object({
  meta: SerpMetaSchema,
  topads: z.array(SerpAdsSchema),
  local_results: SerpLocalResultsSchema.nullable(),
  origin_search: z.object({
    type: SerpOriginSearchTypeSchema,
    results: z.array(SerpOriginSearchSchema)
  }),
  knowledge_panel: z.array(SerpKnowledgePanelSchema),
  bottomads: z.array(SerpAdsSchema),
  related_searches: z.array(SerpRelatedSearchesSchema),
})

export type SerpJSON = z.infer<typeof SerpJsonSchema>;

export type SerpColumn = SerpJSON["origin_search"] | {
  type: "local_results",
  local_results: SerpJSON["local_results"]
} | {
  type: "related_searches",
  related_searches: SerpJSON["related_searches"]
}