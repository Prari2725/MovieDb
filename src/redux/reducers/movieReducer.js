import {
  FETCH_POPULAR_MOVIES,
  FETCH_TOP_RATED_MOVIES,
  FETCH_UPCOMING_MOVIES,
  FETCH_MOVIE_DETAILS,
  FETCH_MOVIE_CAST,
  SEARCH_MOVIES,
  SET_LOADING,
  SET_ERROR
} from '../actions/types';

const initialState = {
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
  searchResults: [],
  movieDetails: null,
  movieCast: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  searchQuery: ''
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    case FETCH_POPULAR_MOVIES:
      return {
        ...state,
        popularMovies: action.payload.movies,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null
      };
      
    case FETCH_TOP_RATED_MOVIES:
      return {
        ...state,
        topRatedMovies: action.payload.movies,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null
      };
      
    case FETCH_UPCOMING_MOVIES:
      return {
        ...state,
        upcomingMovies: action.payload.movies,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null
      };
      
    case FETCH_MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: action.payload,
        loading: false,
        error: null
      };
      
    case FETCH_MOVIE_CAST:
      return {
        ...state,
        movieCast: action.payload,
        loading: false,
        error: null
      };
      
    case SEARCH_MOVIES:
      return {
        ...state,
        searchResults: action.payload.movies,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        searchQuery: action.payload.query,
        loading: false,
        error: null
      };
      
    default:
      return state;
  }
};

export default movieReducer;