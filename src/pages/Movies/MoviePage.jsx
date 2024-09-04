import React, { useEffect, useState } from 'react'
import { useSearchMovieQuery } from './../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import MovieCard from './../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import './MoviePage.style.css'

const MoviePage = () => {

  const [query, setQuery] = useSearchParams()
  const keyword = query.get("q");
  const [page,setPage] = useState(1);

  const {data, isLoading, isError, error} = useSearchMovieQuery({keyword, page});
  const handlePageClick = ({selected}) => {
    setPage(selected+1)
    
  }

  useEffect(() =>{
    setPage(1);
  }, [keyword]);
  
  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>필터</Col>

        <Col lg={8} xs={12}>
        {data?.results.length === 0
        ? <div className='color-white'>결과 없음</div>
        : <>
        <Row>
          {data?.results.map((movie,index)=>
            <Col key={index} lg={4} xs={12}>
              <MovieCard movie={movie}/>
            </Col>
          )}
        </Row>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={data?.total_pages} // 전체 페이지
          forcePage={page-1} // 현재 페이지
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </>}
        </Col>


      </Row>
    </Container>
  )
}

export default MoviePage
