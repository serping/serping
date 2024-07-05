import { 
  SerpDiscussionsAndForumsSchema,
  SerpFeaturedSnippetsSchema,
  SerpFromSourcesAcrossTheWebSchema,
  SerpInlineImagesSchema,
  SerpInlineVideosSchema,
  SerpJsonSchema,
  SerpNormalSchema,
  SerpPeopleAlsoAskSchema,
  SerpRecipesSchema,
  SerpSiteLinksSchema,
  SerpTopStoriesSchema,
  SerpVideoSchema
 } from '@/zod/google/desktop-serp';
import fs from 'fs';
import path from 'path';
/**
 * Check serp json
 * 
 * @param data serp result
 */
export const dataParse =(data: any)=>{
  try{
    const newData = SerpJsonSchema.parse(data);
    for(const item of newData.origin_search.results){
      let itemData;
      switch (item.type){
        case "normal":
          itemData = SerpNormalSchema.parse(item);
          break; 
        case "site_links":
          itemData = SerpSiteLinksSchema.parse(item);
          break;
        case "featured_snippets":
          itemData = SerpFeaturedSnippetsSchema.parse(item);
          break;
        case "inline_videos":
          itemData = SerpInlineVideosSchema.parse(item);
          break;
        case "video":
          itemData = SerpVideoSchema.parse(item);
          break;
        case "from_sources_across_the_web":
          itemData = SerpFromSourcesAcrossTheWebSchema.parse(item);
          break;
        case "discussions_and_forums":
          itemData = SerpDiscussionsAndForumsSchema.parse(item);
          break;
        case "inline_images":
          itemData = SerpInlineImagesSchema.parse(item);
          break;
        case "perspectives":
          itemData = SerpDiscussionsAndForumsSchema.parse(item);
          break;
        case "people_also_ask":
          itemData = SerpPeopleAlsoAskSchema.parse(item);
          break;
        case "recipes":
          itemData = SerpRecipesSchema.parse(item);
          break;
        case "top_stories":
          itemData = SerpTopStoriesSchema.parse(item);
          break;
      }
      return newData;
    }
  }catch(error: any){
    const filePath = path.join(process.cwd() + "/tmp", `error_data_${Date.now()}_${data.meta.search_params.q}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.info(`Error data has been saved to ${filePath}`);
    throw error;
  }
}
