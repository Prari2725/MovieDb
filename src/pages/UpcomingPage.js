import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchUpcomingMovies } from '../redux/actions/movieActions';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }
`;

const ErrorMessage = styled.div`
  color: #e94560;
  background-color: rgba(233, 69, 96, 0.1);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const PaginationContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const UpcomingPage = () => {
  const dispatch = useDispatch();
  const { upcomingMovies, loading, error, currentPage, totalPages } = useSelector(state => state.movies);
  
  useEffect(() => {
    dispatch(fetchUpcomingMovies(currentPage));
  }, [dispatch, currentPage]);
  
  const handlePageChange = (page) => {
    dispatch(fetchUpcomingMovies(page));
  };
  
  return (
    <PageContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {loading ? (
        <Loader />
      ) : (
        <>
          <MoviesGrid>
            {upcomingMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MoviesGrid>
          
          {totalPages > 1 && (
            <PaginationContainer>
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            </PaginationContainer>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default UpcomingPage;