import { useQuery } from "@tanstack/react-query";
import api from './../utils/api';

const fetchMovieReviews=({id, page})=>{
  return api.get(`/movie/${id}/reviews?language=en-US&page=${page}`);
}

export const useMovieReviewsQuery = ({id, page}) => {
  return useQuery({
    queryKey:['movie-reviews'],
    queryFn:() => fetchMovieReviews({id, page}),
    select:(result)=>result.data,
  })
}