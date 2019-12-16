import { createStore } from 'redux';
import { Selector } from 'reselect';
import { combineReducers } from '../lib/redux-helpers';
import { levels } from './levels/reducers';
import { tiles } from './spritesheets/reducers';
import { shared } from './shared/reducers';
import { middleware } from './config';

export function select<S, R> (selector: Selector<S, R>): R {
  return selector(store.getState());
}

export const store = createStore(combineReducers({
  tiles,
  levels,
  shared
}), {}, middleware);

export const dispatch = store.dispatch;
