import React, { useEffect, useState } from "react";
import "./MovieDetailPage.style.css";
import { Badge, Button, Col, Modal, Row, Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieDetailsQuery } from "../../hooks/useMovieDetails";
import { Alert, Rating } from "@mui/material";
import { useRecommendationMoviesQuery } from "./../../hooks/useRecommendMovies";
import MovieCard from "./../../common/MovieCard/MovieCard";
import YouTube from "react-youtube";
import { useMovieTrailerQuery } from './../../hooks/useMovieTrailer';

const MovieDetailPage = () => {
  const [page, setPage] = useState(1);
  const [lgShow, setLgShow] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useMovieDetailsQuery({ id });

  const {
    data: recMovies,
    isLoading: recIsLoading,
    isError: recIsError,
    error: recError,
  } = useRecommendationMoviesQuery({ id, page });

  const {
    data: trailer,
    isLoading: trailerIsLoading,
    isError: trailerIsError,
    error: trailerError,
  } = useMovieTrailerQuery({ id });

  console.log(trailer)

  const toMovieReviewsPage = (id, event) => {
    event.preventDefault();
    navigate(`/movies/${id}/reviews`);
  };

  // const handlePageClick = ({ selected }) => {
  //   setPage(selected + 1);
  // };

  useEffect(() => {
    setPage(1);
  }, [id]);

  if (isLoading || recIsLoading || trailerIsLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  if (recIsError) {
    return <Alert variant="danger">{recError.message}</Alert>;
  }
  if (trailerIsError) {
    return <Alert variant="danger">{trailerError.message}</Alert>;
  }

  if (!movie || !recMovies) {
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
                  <Button
                    variant="danger"
                    onClick={(event) => toMovieReviewsPage(movie.id, event)}
                  >
                    리뷰
                  </Button>
                  <Button variant="danger" onClick={() => setLgShow(true)}>
                    예고편
                  </Button>
                </div>
                <div className="display-flex">
                  연령　
                  {movie?.adult ? (
                    <img alt="" src="/resources/all.png" />
                  ) : (
                    <img alt="" src="/resources/all.png" />
                  )}
                </div>
                <div className="display-flex width80">
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
            {/** 예고편 팝업 modal */}
            <Modal
              size="lg"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  {trailer.name}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <YouTube
                  videoId={trailer.key} //동영상 주소
                  opts={{
                    width: "100%",
                    height: "500px",
                    playerVars: {
                      autoplay: 1, //자동 재생 여부
                    },
                  }}
                  onReady={(e) => {
                    // e.target.mute();
                  }}
                />
              </Modal.Body>
            </Modal>
          </div>
        </Col>
        <Col lg={1} xs={0}></Col>
        <Col lg={5} xs={12}>
          <div className="recommend-board">
            {recMovies?.results.length === 0 ? (
              <div className="color-white">결과 없음</div>
            ) : (
              <>
                <Row>
                  {recMovies?.results.map((movie, index) => (
                    <Col key={index} lg={6} xs={6}>
                      <MovieCard movie={movie} size="detail" />
                    </Col>
                  ))}
                </Row>
                {/**<ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={recMovies?.total_pages}
                forcePage={page - 1}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="break-link"
                containerClassName="pagination"
                activeClassName="active"
              />*/}
              </>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default MovieDetailPage;
