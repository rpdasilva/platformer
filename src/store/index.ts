import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from '../lib/redux-helpers';
import { tiles } from './spritesheets/reducers';
import { middleware } from './config';

export const store = createStore(combineReducers({ tiles }), {}, middleware);