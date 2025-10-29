import { DISPLAY_MOVIE, FETCH_MOVIES,RESET_MOVIE } from './action'

export const initialState= {
movies:[]

}

export function redux(state, action){
    switch (action.type) {
        case FETCH_MOVIES:
            
        return { ...state, movies: [...state.movies, action.payload] };;
    
        default:
            return state;
    }

}