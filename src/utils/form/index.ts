import { JSONStringNumber } from "@/types/object";

const rangeNumber = (end: number, start = 0) => Array.from({ length: end + 1 - start }, (_, k) => k + start);

const arrayToObject = (arr: Array<string | number>) => ({ ...arr } as unknown as JSONStringNumber);

const tomorrowDate = () => new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

export { arrayToObject, rangeNumber, tomorrowDate };
