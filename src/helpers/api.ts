import axios from "axios";
import { IPost } from "../interfaces/IPost";

export const BASE_URL = 'https://hacker-news.firebaseio.com/v0/'

export const  getPostById = async (id: number): Promise<IPost> => {
  const response = await axios.get(`${BASE_URL}/item/${id}.json`)
    .then(({data}) => data)
    .catch(err => console.log(err));
  
  return response
}

export const getPostsId  = async (): Promise<Array<number>> => {
  const response = await axios.get(`${BASE_URL}/newstroies.json`)
    .then(({data}) => data)
    .catch(err => console.log(err));
  
  return response
}
