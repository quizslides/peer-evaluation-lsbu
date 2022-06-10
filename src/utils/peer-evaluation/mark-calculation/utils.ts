const roundTwoDecimalPlaces = (num: number): number => {
  let numberWithPrecision = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(numberWithPrecision) / 100) * Math.sign(num);
};

export { roundTwoDecimalPlaces };
