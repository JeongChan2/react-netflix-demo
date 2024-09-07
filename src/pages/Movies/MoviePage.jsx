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

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  const { data:genreList, isLoading:genIsLoading, isError:genIsError, error:genError } = useGenresListMoviesQuery();

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          {genreList?.genres.map((id,index) => {
            console.log((id.id))
            return <Badge onClick={() => setGenre(id.id)} className="genre-button" bg="danger" key={index}>{id.name}</Badge>
          })}
        </Col>

        <Col lg={8} xs={12}>
          {data?.results.length === 0 ? (
            <div className="color-white">결과 없음</div>
          ) : (
            <>
              <Row>
                {genre?(data?.results.filter((movie) => {
                    return (
                      movie.genre_ids.includes(genre)
                    );
                    

                })).map((movie, index) => {
              
                  return (
                    <Col key={index} lg={4} xs={12}>
                      <MovieCard movie={movie} size="home"/>
                    </Col>
                    )

              }):data?.results.map((movie, index) => {
              
                  return (
                    <Col key={index} lg={4} xs={12}>
                      <MovieCard movie={movie} size="home"/>
                    </Col>
                    )

              })}
              </Row>
              {!genre && (<ReactPaginate
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
              />)}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
