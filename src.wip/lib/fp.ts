import {
  compose,
  cond,
  curry,
  equals,
  identity,
  insert,
  length,
  T
} from 'ramda';

export {
  compose,
  cond,
  curry,
  equals,
  identity,
  insert,
  length,
  T
} from 'ramda';

export const lengthEq = curry((n: number, list: any[]) => compose(equals(n), length)(list));

export const expandRange = curry((n: number, list: any[]): any[] => <any>cond([
  [<any>lengthEq(2), compose(insert(1, n), insert(2, n))],
  [<any>lengthEq(3), insert(3, n)],
  [T, identity]
])(list));
