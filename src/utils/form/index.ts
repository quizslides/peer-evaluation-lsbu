import * as lodash from "lodash";

import { ArrayObject, JSONStringNumber } from "@/types/object";

type ObjectArray = [{ [key: string]: object }];

const rangeNumber = (end: number, start = 0) => Array.from({ length: end + 1 - start }, (_, k) => k + start);

const arrayToObject = (arr: Array<string | number>) => ({ ...arr } as unknown as JSONStringNumber);

const tomorrowDate = () => new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

const getMergedKeyValuesObject = (keys: Array<string>, values: ArrayObject) => lodash.zipObject(keys, values);

const objectToArrayOfObject = (objectKey: string, obj: ObjectArray) =>
  obj.map((data) => ({
    [objectKey]: data[objectKey],
  }));

const objectToArrayOfObjectInline = (objectKey: string, obj: ObjectArray) => obj.map((data) => data[objectKey]);

export {
  arrayToObject,
  getMergedKeyValuesObject,
  objectToArrayOfObject,
  objectToArrayOfObjectInline,
  rangeNumber,
  tomorrowDate,
};

export type { ObjectArray };
