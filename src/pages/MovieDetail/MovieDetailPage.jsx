import React from "react";
import "./MovieDetailPage.style.css";
import { Badge, Button, Col, Container, Row, Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieDetailsQuery } from "../../hooks/useMovieDetails";
import { Alert, Rating } from "@mui/material";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useMovieDetailsQuery({ id });


  const toMovieReviewsPage = (id, event) => {
    event.preventDefault();
    navigate(`/movies/${id}/reviews`);

  }





  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  if (!movie) {
    return <h1>No movie data available</h1>;
  }

  return (
    <>
      <Row>
        <Col lg={6} xs={12}>
          <div
            style={{
              backgroundImage: `url(https://media.themoviedb.org/t/p/original/${movie?.poster_path})`,
            }}
            className="poster-card"
          >
            <div className="detail-content">
              <div className="content-h2">{movie?.title}</div>
              <div className="content-release">{movie?.release_date}</div>
              <div className="content-p">{movie?.overview}</div>
              <div className="content-others">
                <div className="display-flex">
                  평점　
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating-read"
                      value={movie?.vote_average / 2}
                      precision={0.1}
                      readOnly
                    />
                  </Stack>
                  <Button variant="danger" onClick={(event) => toMovieReviewsPage(movie.id, event)}>리뷰</Button>
                </div>
                <div className="display-flex">
                  연령　
                  {movie?.adult ? (
                    <img alt="" src="/resources/all.png" />
                  ) : (
                    <img alt="" src="/resources/all.png" />
                  )}
                </div>
                <div className="display-flex">
                  장르　
                  {movie.genres && movie.genres.length > 0 ? (
                    movie.genres.map((genre, index) => (
                      <Badge className="overlay-genres" bg="danger" key={index}>
                        {genre.name}
                      </Badge>
                    ))
                  ) : (
                    <span>No genres available</span> // 장르가 없을 경우
                  )}
                </div>
                <div className="display-flex">
                  시간　
                  {movie?.runtime}분
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col lg={6} xs={12}>hihihi</Col>
      </Row>
    </>
  );
};

export default MovieDetailPage;
