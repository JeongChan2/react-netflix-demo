import { useQuery } from "@tanstack/react-query";
import api from './../utils/api';

const fetchRecommendationMovie=({id, page})=>{
  return api.get(`/movie/${id}/recommendations?language=ko-KR&page=${page}`);
}

export const useRecommendationMoviesQuery = ({id, page}) => {
  return useQuery({
    queryKey:['movie-recommendation'],
    queryFn:() => fetchRecommendationMovie({id, page}),
    select:(result)=>result.data,
  })
}