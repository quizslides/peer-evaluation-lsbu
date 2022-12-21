import { Prisma } from "@/pages/api/prisma";

const getMarkSanitized = (mark: number | null) => {
  if (mark && isNaN(mark)) {
    mark = 0;
  }

  return mark ? new Prisma.Decimal(mark) : mark;
};

const roundTwoDecimalPlaces = (num: number): number => {
  let numberWithPrecision = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(numberWithPrecision) / 100) * Math.sign(num);
};

export { getMarkSanitized, roundTwoDecimalPlaces };
