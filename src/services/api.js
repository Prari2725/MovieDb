import axios from 'axios';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const api = {
  // Get popular movies
  getPopularMovies: (page = 1) => {
    return axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
  },
  
  // Get top rated movies
  getTopRatedMovies: (page = 1) => {
    return axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`);
  },
  
  // Get upcoming movies
  getUpcomingMovies: (page = 1) => {
    return axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`);
  },
  
  // Get movie details
  getMovieDetails: (movieId) => {
    return axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
  },
  
  // Get movie cast
  getMovieCast: (movieId) => {
    return axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
  },
  
  // Search movies
  searchMovies: (query, page = 1) => {
    return axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`);
  },
  
  // Get image URL
  getImageUrl: (path) => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}${path}`;
  }
};

export default api;