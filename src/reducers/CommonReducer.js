import { LOADING, DONE_LOADING } from '../actions/ActionTypes';

const initialState = {
    loading : false,
}

export default function(state=initialState,action){
    switch (action.type) {
        case LOADING:
            return {...state, loading:true};
        case DONE_LOADING:
            return {...state, loading:false};
        default:
            return state;
    }
}
