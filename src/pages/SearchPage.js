import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { searchMovies } from '../redux/actions/movieActions';
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

const SearchInfo = styled.div`
  color: #fff;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  
  span {
    color: #e94560;
    font-weight: bold;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
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

const NoResults = styled.div`
  color: #fff;
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  background-color: rgba(22, 33, 62, 0.5);
  border-radius: 8px;
  
  span {
    color: #e94560;
    font-weight: bold;
  }
`;

const PaginationContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const SearchPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { searchResults, loading, error, currentPage, totalPages, searchQuery } = useSelector(state => state.movies);
  
  // Get query from URL
  const query = new URLSearchParams(location.search).get('query') || searchQuery;
  
  useEffect(() => {
    if (query) {
      dispatch(searchMovies(query, currentPage));
    }
  }, [dispatch, query, currentPage]);
  
  const handlePageChange = (page) => {
    dispatch(searchMovies(query, page));
  };
  
  return (
    <PageContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {loading ? (
        <Loader />
      ) : (
        <>
          <SearchInfo>Search results for <span>"{query}"</span></SearchInfo>
          
          {searchResults.length === 0 ? (
            <NoResults>No movies found matching <span>"{query}"</span></NoResults>
          ) : (
            <>
              <MoviesGrid>
                {searchResults.map(movie => (
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
        </>
      )}
    </PageContainer>
  );
};

export default SearchPage;