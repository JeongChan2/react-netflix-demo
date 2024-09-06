import React from "react";
import { Badge } from "react-bootstrap";
import './MovieCard.style.css';
import { Alert, Rating, Stack } from "@mui/material";
import { useGenresListMoviesQuery } from "../../hooks/useGenresListMovies";
import { useNavigate } from "react-router-dom";


const MovieCard = ({movie}) => {
  const { data:genresList, isLoading, isError, error } = useGenresListMoviesQuery();
  const navigate = useNavigate();

  const toMovieDetailPage = (id, event) => {
    event.preventDefault();
    navigate(`/movies/${id}`);

  }


  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  
  return (
    <div onClick={(event) => toMovieDetailPage(movie?.id, event)}
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/original/${movie?.poster_path})`,
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h2>{movie?.title}</h2>
        <div>{movie?.genre_ids.map((id,index) => {

          const foundObject = genresList.genres.find(obj => obj.id === id);
          return <Badge className="overlay-genres" bg="danger" key={index}>{foundObject.name}</Badge>
          
        })}</div>
        <div>
          <div>{movie?.vote_average.toString().substring(0,4)}</div>
          <Stack spacing={1}>
            <Rating name="half-rating-read" defaultValue={movie?.vote_average/2} precision={0.1} readOnly />
          </Stack>
          {/* <div>{movie?.popularity}</div> */}
          <div>{movie?.adult?<img alt="" src="/resources/all.png"/>:<img alt="" src="/resources/all.png"/>}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;