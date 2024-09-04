import React from 'react'
import './MovieSlider.style.css'
import Carousel from "react-multi-carousel";
import MovieCard from '../MovieCard/MovieCard';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const MovieSlider = ({subTitle, movies}) => {
  return (
    <div>
      <h3 className="color-white">{subTitle}</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {movies.map((movie,index)=><MovieCard movie={movie} key={index} />)}
        
      </Carousel>
    </div>
  )
}

export default MovieSlider
