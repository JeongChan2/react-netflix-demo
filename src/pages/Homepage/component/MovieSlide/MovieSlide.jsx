import React from "react";
import { Alert } from "bootstrap";
import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";



const MovieSlide = ({usehook, subTitle, genresList}) => {
  const { data, isLoading, isError, error } = usehook();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider subTitle={subTitle} movies={data.results} genresList={genresList} />
      
    </div>
  );
};

export default MovieSlide;
