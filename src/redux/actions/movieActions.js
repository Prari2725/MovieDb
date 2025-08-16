import {
  FETCH_POPULAR_MOVIES,
  FETCH_TOP_RATED_MOVIES,
  FETCH_UPCOMING_MOVIES,
  FETCH_MOVIE_DETAILS,
  FETCH_MOVIE_CAST,
  SEARCH_MOVIES,
  SET_LOADING,
  SET_ERROR
} from './types';
import api from '../../services/api';

// Set loading state
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

// Fetch popular movies
export const fetchPopularMovies = (page = 1) => async dispatch => {
  try {
    dispatch(setLoading());
    const response = await api.getPopularMovies(page);
    dispatch({
      type: FETCH_POPULAR_MOVIES,
      payload: {
        movies: response.data.results,
        totalPages: response.data.total_pages,
        currentPage: page
      }
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: error.message
    });
  }
};

// Fetch top rated movies
export const fetchTopRatedMovies = (page = 1) => async dispatch => {
  try {
    dispatch(setLoading());
    const response = await api.getTopRatedMovies(page);
    dispatch({
      type: FETCH_TOP_RATED_MOVIES,
      payload: {
        movies: response.data.results,
        totalPages: response.data.total_pages,
        currentPage: page
      }
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: error.message
    });
  }
};

// Fetch upcoming movies
export const fetchUpcomingMovies = (page = 1) => async dispatch => {
  try {
    dispatch(setLoading());
    const response = await api.getUpcomingMovies(page);
    dispatch({
      type: FETCH_UPCOMING_MOVIES,
      payload: {
        movies: response.data.results,
        totalPages: response.data.total_pages,
        currentPage: page
      }
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: error.message
    });
  }
};

// Fetch movie details
export const fetchMovieDetails = (movieId) => async dispatch => {
  try {
    dispatch(setLoading());
    const response = await api.getMovieDetails(movieId);
    const castResponse = await api.getMovieCast(movieId);
    
    dispatch({
      type: FETCH_MOVIE_DETAILS,
      payload: response.data
    });
    
    dispatch({
      type: FETCH_MOVIE_CAST,
      payload: castResponse.data.cast
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: error.message
    });
  }
};

// Search movies
export const searchMovies = (query, page = 1) => async dispatch => {
  try {
    dispatch(setLoading());
    const response = await api.searchMovies(query, page);
    dispatch({
      type: SEARCH_MOVIES,
      payload: {
        movies: response.data.results,
        totalPages: response.data.total_pages,
        currentPage: page,
        query
      }
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: error.message
    });
  }
};