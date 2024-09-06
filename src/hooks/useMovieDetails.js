import { useQuery } from "@tanstack/react-query";
import api from './../utils/api';

const fetchMovieDetails=({id})=>{
  return api.get(`/movie/${id}?language=ko-KR`);
}

export const useMovieDetailsQuery = ({id}) => {
  return useQuery({
    queryKey:['movie-details'],
    queryFn:() => fetchMovieDetails({id}),
    select:(result)=>result.data,
  })
}