import { expect } from "@jest/globals";

import { roundTwoDecimalPlaces } from "@/utils/peer-evaluation/mark-calculation/utils";

describe("Round Number to two decimal places", () => {
  test("Rounding up a number", () => {
    expect(roundTwoDecimalPlaces(2.005)).toBe(2.01);
  });

  test("Rounding down a number", () => {
    expect(roundTwoDecimalPlaces(2.004)).toBe(2.0);
  });

  test("Calculating rounded number of a number with no decimal", () => {
    expect(roundTwoDecimalPlaces(10)).toBe(10.0);
  });

  test("Rounding up a number with many decimals", () => {
    expect(roundTwoDecimalPlaces(108.07628915662651)).toBe(108.08);
  });

  test("Rounding down a number with many decimals", () => {
    expect(roundTwoDecimalPlaces(108.07228915662651)).toBe(108.07);
  });

  test("Rounding up a number on the edge of the number", () => {
    expect(roundTwoDecimalPlaces(99.99)).not.toBe(100);
  });
});
