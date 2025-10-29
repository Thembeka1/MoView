import { SET_MOVIES, RESET_MOVIES, SELECT_MOVIE, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, SEARCH_MOVIES } from "./action";

const initialState = {
  movies: [],      // list of movies
  selectedMovie: null, // optional: currently selected movie
  favorites: [],   // favorite movies
  searchQuery: "", // current search term
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };

    case RESET_MOVIES:
      return {
        ...state,
        movies: [],
        selectedMovie: null,
      };

    case SELECT_MOVIE:
      return {
        ...state,
        selectedMovie: action.payload,
      };

    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(movie => movie.id !== action.payload),
      };

    case SEARCH_MOVIES:
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
}