import React from "react";
import { Badge } from "react-bootstrap";
import './MovieCard.style.css';
import { Rating, Stack } from "@mui/material";


const MovieCard = ({movie, genresList}) => {
  // console.log(genresList)
  
  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/original/${movie.poster_path})`,
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h2>{movie?.title}</h2>
        <div>{movie.genre_ids.map((id,index) => {

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