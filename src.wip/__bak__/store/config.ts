import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

export const middleware = applyMiddleware(
  thunk,
  createLogger()
);
