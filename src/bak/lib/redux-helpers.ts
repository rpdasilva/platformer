import { AnyAction } from 'redux';

export interface Strategies {
  [strategyName: string]: Function;
};

export type Reducer<S> = (state: S, action: AnyAction, globalState: any, key: string) => S;

export interface ReducersMapObject {
  [key: string]: Reducer<any>;
}

export const buildStrategy = (initialState: any, strategies: Strategies) =>
  (state = initialState, action: AnyAction, global: any) => {
    return action.type in strategies
      ? strategies[action.type](state, action, global)
      : state;
  };

export const combineReducers = (reducers: ReducersMapObject) =>
  (state: any, action: AnyAction) => Object.entries(reducers)
    .reduce((nextState: any, [key, reducer]: [string, Reducer<any>]) => {
      nextState[key] = reducer(state[key], action, state, key);
      return nextState;
    }, {});
