import { useQuery } from "@tanstack/react-query"
import api from './../utils/api';

const fetchSearchMovie=({keyword, page})=>{
  return keyword
  ? api.get(`/search/movie?query=${keyword}&include_adult=false&language=ko-KR&page=${page}`)
  : api.get(`/movie/popular?language=ko-KR&page=${page}`);
}

export const useSearchMovieQuery=({keyword, page, sortByAsc}) => {
  return useQuery({
    queryKey:['move-search', {keyword, page, sortByAsc}],
    queryFn: () =>fetchSearchMovie({keyword, page}),
    select:(result)=>result.data
  })
}