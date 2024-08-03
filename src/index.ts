import axios, { AxiosInstance } from 'axios';
import config from "./config";
import {SerpingConfig} from "./types";
import { GoogleSerpSearchParam } from "./zod/google/base";

class Serping {
  private axiosInstance: AxiosInstance;

  constructor({ region = 'us-east-1', apiKey }: SerpingConfig) {
    
    const baseURL = config.serpingApi[region].baseUrl + "/api/v1/";
    const axiosConfig = {
      baseURL,
      headers: {
        'x-api-key': apiKey ?? config.serpingApi[region].apiKey
      }
    };
    const axiosInstance = axios.create(axiosConfig);

    this.axiosInstance = axiosInstance; 
   }

  private async get(endpoint: string, params?: Record<string, any>) {
    try {
      return await this.axiosInstance.get(endpoint, { params });
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.error || 'Request failed');
      } else {
        throw new Error(error.message || 'Request failed');
      }
    }
  }

  async googleSerp( {
    q,
    snapshot = "off",
    thumbnail = "on",
    num = 10,
    gl = "us",
    hl = "en",
    tbm,
    start,
    lsig,
    ludocid,
    uule,
    location
  }: GoogleSerpSearchParam): Promise<any> {
    if(!q) throw new Error("query is empty");
    const opts = {
      q,
      snapshot,
      thumbnail,
      num,
      start,
      gl,
      hl,
      lsig,
      ludocid,
      uule,
      location,
    } as GoogleSerpSearchParam
    if(tbm && config.google.tbmMaps[tbm] ){
      opts["tbm"] = tbm
    }else if(tbm){
      throw new Error(`tbm support only: ${  Object.keys(config.google.tbmMaps).join(', ')}`)
    }
    const response = await this.get("google/serp", opts);
    return response.data;
  }

  async googleSerpSnapshot({ id }:{
    id: string;
  }){
    const response = await this.get(`google/${id}/serp.html`);
    if(response.status !== 200) throw new Error(`Get Snapshot Error: status ${response.status}`);
    return response.data;
  }
}

export default Serping;
