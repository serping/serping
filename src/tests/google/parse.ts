import { 
  SerpBookSchema,
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
  SerpThingsToKnowSchema,
  SerpTopStoriesSchema,
  SerpTwitterSchema,
  SerpVideoSchema,
  SerpLocalResultsSchema, 
  type SerpOriginSearch,
  type SerpLocalResults,
  SerpPerspectivesSchema,
  SerpLocalNormalSchema,
  SerpLocalServicesSchema,
  SerpLocalDirectionsSchema,
  SerpLocalServicePlaceSchema,
  SerpLocalNormalPlaceSchema,
  SerpLocalDirectionPlaceNormalSchema,
  SerpLocalMapSchema,
  SerpLocalMapGpsSchema
 } from '@/zod/google/desktop-serp';
import fs from 'fs';
import path from 'path';

const localParse =(results: SerpLocalResults | null )=>{
  if(!results) return;
  const {local_results} = SerpLocalResultsSchema.parse(results);
  switch (local_results.type){
    case "normal":
      const normal =  SerpLocalNormalSchema.parse(local_results);
      normal.places.map(place => SerpLocalNormalPlaceSchema.parse(place)); 
    break;
    case "services":
      const services =  SerpLocalServicesSchema.parse(local_results);
      services.places.forEach(place => { 
        SerpLocalServicePlaceSchema.parse(place)
      });
      break;
    case "directions":
      const directions =  SerpLocalDirectionsSchema.parse(local_results);
      directions.places.map(place => SerpLocalDirectionPlaceNormalSchema.parse(place));
      break;
    default:
      // 
  }
  if(local_results.local_map) {
    const local_map =  SerpLocalMapSchema.parse(local_results.local_map);
    SerpLocalMapGpsSchema.parse(local_map.gps_coordinates);
  }
  return local_results;
}

const originSearchParse =(results: SerpOriginSearch[])=>{
    for(const item of results){
      try{
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
              itemData = SerpPerspectivesSchema.parse(item);
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
            case "book":
              itemData = SerpBookSchema.parse(item);
              break;
            case "things_to_know":
              itemData = SerpThingsToKnowSchema.parse(item);
              break;
            case "twitter":
              itemData = SerpTwitterSchema.parse(item);
              break;
            case "local_results":
              itemData = localParse(item as SerpLocalResults);
              break;
          } 
        }catch(error: any){
          console.error(JSON.stringify(item))
          throw error;
        }
    }
 
}

/**
 * Check serp json
 * 
 * @param data serp result
 */
export const dataParse =(data: any)=>{
  try{
    const newData = SerpJsonSchema.parse(data); 
    originSearchParse(newData.origin_search.results);
    return newData;
  }catch(error: any){
    const filePath = path.join(process.cwd() + "/tmp", `error_data_${Date.now()}_${data.meta.search_params.q}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.info(`Error data has been saved to ${filePath}`);
    throw error;
  }
}
