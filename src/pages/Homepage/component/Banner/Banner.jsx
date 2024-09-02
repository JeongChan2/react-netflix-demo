import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import { Alert } from 'bootstrap';
import './Banner.style.css'

const Banner = () => {


  const {data, isLoading, isError, error} = usePopularMoviesQuery();
  let overview = ""

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 20); // 0부터 19까지의 랜덤한 숫자 생성
  };

  const randNum = getRandomNumber();

  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(isError) {
    return <Alert variant='danger'>{error.message}</Alert>
  }
  console.log(data)

  overview = data.results[randNum].overview

  return (
    <div style={{
      backgroundImage:`url(https://image.tmdb.org/t/p/original${data?.results[randNum].poster_path})`
    }} className='banner'>
      
      <div className='text-white banner-text-area'>
        <h1>{data?.results[randNum].title}</h1>
        <p>{data?overview.length>100?overview.substring(0,100)+"...":"":""}</p>
      </div>
    </div>
  )
}

export default Banner
