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
  
  return (
    <div>
      <Banner/>
      <MovieSlide usehook={usePopularMoviesQuery} subTitle={'Popular Movies'} />
      <MovieSlide usehook={useTopRatedMoviesQuery} subTitle={'Top Rated Movies'}/>
      <MovieSlide usehook={useUpComingMoviesQuery} subTitle={'Upcoming Movies'}/>
    </div>
  )
}

export default HomePage
