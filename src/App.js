import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/Homepage/HomePage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieReviewsPage from './pages/MovieReviews/MovieReviewsPage';


// 홈페이지 /
// 영화 전체보여주는 페이지 (서치) /movies
// 영화 디테일 페이지 /movies/:id
function App() {
  return (
    <div className='whole'>
      <Routes>


        <Route path='/' element={<AppLayout/>}>


          <Route index element={<HomePage/>}/> {/* index : 위 path를 그대로 path로 쓰겠다*/}


          <Route path='movies'>
            <Route index element={<MoviePage/>}/>
            <Route path=':id'>
              <Route index element={<MovieDetailPage/>}/>
              <Route path='reviews' element={<MovieReviewsPage/>}/>
            </Route>
          </Route>


        </Route>
        
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>

    </div>
  );
}

export default App;
