type JSONStringNumber = {
  [key: string]: string | number;
};

type JSONString = {
  [key: string]: string;
};

type ArrayObject = Array<string | number | undefined>;

export type { ArrayObject, JSONString, JSONStringNumber };
