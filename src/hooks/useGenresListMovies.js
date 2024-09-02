import { useQuery } from "@tanstack/react-query";
import api from './../utils/api';

const fetchGenresListMovies=()=>{
  return api.get(`/genre/movie/list?language=ko`);
}

export const useGenresListMoviesQuery = () => {
  return useQuery({
    queryKey:['movie-genres-List'],
    queryFn:fetchGenresListMovies,
    select:(result)=>result.data,
    refetchOnMount: false,
  })
}