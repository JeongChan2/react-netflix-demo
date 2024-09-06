import React, { useEffect, useState } from "react";
import "./MovieReviewsPage.style.css";
import { useLocation, useParams } from "react-router-dom";
import { useMovieReviewsQuery } from "./../../hooks/useMovieReviews";
import { Alert, Container } from "react-bootstrap";
import ReviewContent from "./component/ReviewContent/ReviewContent";
import ReactPaginate from "react-paginate";

const MovieReviewsPage = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const location = useLocation();
  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useMovieReviewsQuery({ id, page });

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  useEffect(() => {
    setPage(1);
  }, [location.pathname]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  if (!movie || !movie.results || movie.results.length === 0) {
    return <h1>No data available</h1>;
  }

  return (
    <Container className="review-container">
      <div className="reviews-title">Reviews</div>
      {movie?.results.map((review, index) => {
        return (
          <React.Fragment key={index}>
            <div className="review">
              <div
                style={
                  review?.author_details.avatar_path
                    ? {
                        backgroundImage: `url(https://media.themoviedb.org/t/p/original/${review?.author_details.avatar_path})`,
                      }
                    : { backgroundImage: `url(/resources/profileNull.png)` }
                }
                className="profile-img"
              ></div>
              <div className="review-author">{review?.author}</div>
            </div>
            <ReviewContent content={review?.content} />
          </React.Fragment>
        );
      })}
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={movie?.total_pages}
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
    </Container>
  );
};

export default MovieReviewsPage;
