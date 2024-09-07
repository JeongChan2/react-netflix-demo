import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "./../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Badge, Col, Container, Row } from "react-bootstrap";
import MovieCard from "./../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";
import { useGenresListMoviesQuery } from "../../hooks/useGenresListMovies";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState(null);
  const [sortByAsc, setSortByAsc] = useState(false);

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    sortByAsc,
  });

  const {
    data: genreList,
    isLoading: genIsLoading,
    isError: genIsError,
    error: genError,
  } = useGenresListMoviesQuery();

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  // 영화 목록을 정렬하는 함수
  const sortedMovies = (movies) => {
    return movies?.sort((a, b) => {
      return sortByAsc
        ? a.popularity - b.popularity
        : b.popularity - a.popularity;
    });
  };

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <Col>
            <Badge
              onClick={() => setSortByAsc(false)}
              className="popularity-button"
              bg="primary"
            >
              Popularity(Desc)
            </Badge>
            <Badge
              onClick={() => setSortByAsc(true)}
              className="popularity-button"
              bg="primary"
            >
              Popularity(Asc)
            </Badge>
          </Col>
          <Col>
            {genreList?.genres.map((id, index) => {
              return (
                <Badge
                  onClick={() => setGenre(id.id)}
                  className="genre-button"
                  bg="danger"
                  key={index}
                >
                  {id.name}
                </Badge>
              );
            })}
          </Col>
        </Col>

        <Col lg={8} xs={12}>
          {data?.results.length === 0 ? (
            <div className="color-white">결과 없음</div>
          ) : (
            <>
              <Row>
                {genre
                  ? sortedMovies(
                      data?.results.filter((movie) =>
                        movie?.genre_ids.includes(genre)
                      )
                    )?.map((movie, index) => {
                      return (
                        <Col key={index} lg={4} xs={12}>
                          <MovieCard movie={movie} size="home" />
                        </Col>
                      );
                    })
                  : sortedMovies(data?.results)?.map((movie, index) => {
                      return (
                        <Col key={index} lg={4} xs={12}>
                          <MovieCard movie={movie} size="home" />
                        </Col>
                      );
                    })}
              </Row>
              {!genre && (
                <ReactPaginate
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={data?.total_pages}
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
                />
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
