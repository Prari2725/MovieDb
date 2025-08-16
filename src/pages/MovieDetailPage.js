import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchMovieDetails } from '../redux/actions/movieActions';
import Loader from '../components/Loader';
import api from '../services/api';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: #fff;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MovieHeader = styled.div`
  display: flex;
  margin-bottom: 2rem;
  background-color: #16213e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PosterContainer = styled.div`
  flex: 0 0 300px;
  
  @media (max-width: 768px) {
    flex: 0 0 auto;
    width: 100%;
    height: 300px;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MovieInfo = styled.div`
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 0 0 0.5rem;
  font-size: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Rating = styled.div`
  color: #e94560;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Details = styled.div`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #ccc;
  line-height: 1.6;
`;

const OverviewSection = styled.div`
  background-color: #16213e;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const OverviewTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.2rem;
  color: #e94560;
`;

const OverviewText = styled.p`
  line-height: 1.6;
  margin: 0;
`;


const CastSection = styled.div`
  background-color: #16213e;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CastTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.2rem;
  color: #e94560;
`;

const CastContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
`;

const CastCard = styled.div`
  background-color: #1a1a2e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CastImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  
  @media (max-width: 576px) {
    height: 180px;
  }
`;

const CastInfo = styled.div`
  padding: 0.75rem;
`;

const CastName = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const Character = styled.div`
  font-size: 0.8rem;
  color: #ccc;
`;

const ErrorMessage = styled.div`
  color: #e94560;
  background-color: rgba(233, 69, 96, 0.1);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const MovieDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetails, movieCast, loading, error } = useSelector(state => state.movies);
  
  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);
  
  if (loading) return <Loader />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!movieDetails) return null;
  
  const {
    title,
    poster_path,
    vote_average,
    release_date,
    runtime,
    genres,
    overview
  } = movieDetails;
  
  const posterUrl = api.getImageUrl(poster_path);

  
  // Format release date
  const formattedDate = release_date ? new Date(release_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Unknown';
  
  // Format runtime
  const formatRuntime = (minutes) => {
    if (!minutes) return 'Unknown';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours} hr` : ''} ${mins > 0 ? `${mins} min` : ''}`;
  };
  
  return (
    <PageContainer>
      <MovieHeader>
        <PosterContainer>
          <Poster 
            src={posterUrl || 'https://via.placeholder.com/300x450?text=No+Image'} 
            alt={title} 
          />
        </PosterContainer>
        
        <MovieInfo>
          <Title>{title}</Title>
          <Rating>Rating: {vote_average?.toFixed(1)}</Rating>
          
          <Details>
            <div>{release_date?.substring(0, 4)} | {formatRuntime(runtime)}</div>
            <div>{genres?.map(g => g.name).join(', ') || 'Unknown'}</div>
            <div>Release Date: {formattedDate}</div>
          </Details>
        </MovieInfo>
      </MovieHeader>
      
      <OverviewSection>
        <OverviewTitle>Overview</OverviewTitle>
        <OverviewText>{overview || 'No overview available.'}</OverviewText>
      </OverviewSection>
      
      <CastSection>
        <CastTitle>Cast</CastTitle>
        <CastContainer>
          {movieCast?.slice(0, 6).map(person => (
            <CastCard key={person.id}>
              <CastImage 
                src={api.getImageUrl(person.profile_path) || 'https://via.placeholder.com/150x225?text=No+Image'} 
                alt={person.name} 
              />
              <CastInfo>
                <CastName>{person.name}</CastName>
                <Character>Character: {person.character}</Character>
              </CastInfo>
            </CastCard>
          ))}
        </CastContainer>
      </CastSection>
    </PageContainer>
  );
};

export default MovieDetailPage;