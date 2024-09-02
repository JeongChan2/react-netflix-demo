import { useQuery } from "@tanstack/react-query";
import api from './../utils/api';

const fetchUpComingMovies=()=>{
  return api.get(`/movie/upcoming?language=ko-KR&page=1`);
}

export const useUpComingMoviesQuery = () => {
  return useQuery({
    queryKey:['movie-upcoming'],
    queryFn:fetchUpComingMovies,
    select:(result)=>result.data
    
  })
}