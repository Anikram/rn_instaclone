import {createStore, applyMiddleware, combineReducers} from "redux";
import { userReducer } from './reducers/user';
import thunk from "redux-thunk";

const store = createStore(combineReducers({
  userReducer
}), applyMiddleware(thunk));

export default store;


