import {combineReducers, createStore} from 'redux';
import {userReducer, voteReducer} from "./reducer";


const reducers = combineReducers({
    userReducer,
    voteReducer,
});

export const store = createStore(reducers);
