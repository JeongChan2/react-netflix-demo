import React from 'react'
import Banner from './component/Banner/Banner'
import MovieSlide from './component/MovieSlide/MovieSlide'
import { usePopularMoviesQuery } from '../../hooks/usePopularMovies'
import { useTopRatedMoviesQuery } from './../../hooks/useTopRatedMovies';
import { useUpComingMoviesQuery } from './../../hooks/useUpComingMovies';
import { useGenresListMoviesQuery } from '../../hooks/useGenresListMovies';
import { Alert } from 'bootstrap';


// 1. 배너 => popular movie 첫번째
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie
const HomePage = () => {
  const { data, isLoading, isError, error } = useGenresListMoviesQuery();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <Banner/>
      <MovieSlide usehook={usePopularMoviesQuery} subTitle={'Popular Movies'} genresList={data}/>
      <MovieSlide usehook={useTopRatedMoviesQuery} subTitle={'Top Rated Movies'} genresList={data}/>
      <MovieSlide usehook={useUpComingMoviesQuery} subTitle={'Upcoming Movies'} genresList={data}/>
    </div>
  )
}

export default HomePage
