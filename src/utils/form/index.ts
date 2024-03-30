import * as lodash from "lodash";

import { ArrayObject, JSONStringNumber } from "@/types/object";

type ObjectArray = [{ [key: string]: object }];

type ObjectArrayOfObject = [{ [key: string]: { [key: string]: object } }];

type ObjectNormalizedType = { [x: string]: object[] };

const rangeNumber = (end: number, start = 0) => Array.from({ length: end + 1 - start }, (_, k) => k + start);

const getRangeNumberObject = (end: number, start = 0) => {
  const arr = Array.from({ length: end + 1 - start }, (_, k) => k + start);

  return Object.assign({}, ...arr.map((v) => ({ [v]: v })));
};

const arrayToObject = (arr: Array<string | number>) => ({ ...arr }) as unknown as JSONStringNumber;

const tomorrowDate = () => new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

const getMergedKeyValuesObject = (keys: Array<string>, values: ArrayObject) => lodash.zipObject(keys, values);

const objectToArrayOfObject = (objectKey: string, obj: ObjectArray) =>
  obj.map((data) => ({
    [objectKey]: data[objectKey],
  }));

const objectToArrayOfObjectInline = (objectKey: string, obj: ObjectArray) => obj.map((data) => data[objectKey]);

const getNormalizedObjectArray = (object: ObjectNormalizedType) => {
  let common = {};

  return Object.keys(object)
    .filter((k) => Array.isArray(object[k]))
    .reduce(
      (r, k) => (object[k].forEach((o, i) => Object.assign((r[i] = r[i] || Object.assign({}, common)), o)), r),
      []
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSortedObject = (o: any) =>
  Object.keys(o)
    .sort()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .reduce((r: any, k) => ((r[k] = o[k]), r), {});

const getUniqueObjectArray = (objArr: ObjectArray) =>
  [...new Set(objArr.map((o) => JSON.stringify(o)))].map((s) => JSON.parse(s));

const getDifferenceTwoArrays = (firstArray: string[], secondArray: string[]) =>
  lodash.difference(secondArray, firstArray);

export {
  arrayToObject,
  getDifferenceTwoArrays,
  getMergedKeyValuesObject,
  getNormalizedObjectArray,
  getRangeNumberObject,
  getSortedObject,
  getUniqueObjectArray,
  objectToArrayOfObject,
  objectToArrayOfObjectInline,
  rangeNumber,
  tomorrowDate,
};

export type { ObjectArray, ObjectArrayOfObject, ObjectNormalizedType };
