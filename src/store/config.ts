import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

export const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger()
);
