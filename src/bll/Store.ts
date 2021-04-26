import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { Reducer } from './Reducer';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
  app: Reducer,
});

export type AppStateType = ReturnType<typeof reducers>;

export let store = createStore(reducers, applyMiddleware(thunkMiddleware));
