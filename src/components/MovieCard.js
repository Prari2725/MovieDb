import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';

const Card = styled.div`
  background-color: #16213e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(233, 69, 96, 0.2);
  }
`;

const PosterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 150%; /* 2:3 aspect ratio for movie posters */
  overflow: hidden;
`;

const Poster = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  color: #fff;
  font-size: 1rem;
  margin: 0 0 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 2.5rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  padding-top: 0.5rem;
  color: #e94560;
  font-weight: bold;
  font-size: 0.9rem;
  
  &:before {
    content: '★';
    margin-right: 0.25rem;
  }
`;

const ReleaseYear = styled.div`
  color: #8a8a8a;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movie;
  const posterUrl = api.getImageUrl(poster_path);
  const releaseYear = release_date ? new Date(release_date).getFullYear() : '';
  
  return (
    <Link to={`/movie/${id}`} style={{ textDecoration: 'none' }}>
      <Card>
        <PosterContainer>
          <Poster 
            src={posterUrl || 'https://via.placeholder.com/300x450?text=No+Image'} 
            alt={title} 
          />
        </PosterContainer>
        <Content>
          <Title>{title}</Title>
          {releaseYear && <ReleaseYear>{releaseYear}</ReleaseYear>}
          <Rating>{vote_average.toFixed(1)}</Rating>
        </Content>
      </Card>
    </Link>
  );
};

export default MovieCard;