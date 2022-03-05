import { errorLogger, infoLogger, logger } from "@/utils/logger";

describe("Logger tests", () => {
  test("Logger info wrapper is executed", () => {
    const loggerInfoSpy = jest.spyOn(logger, "info");
    infoLogger("message");
    expect(loggerInfoSpy).toHaveBeenCalledTimes(1);
  });

  test("Logger error wrapper is executed", () => {
    const loggerErrorSpy = jest.spyOn(logger, "error");
    errorLogger("error");
    expect(loggerErrorSpy).toHaveBeenCalledTimes(1);
  });
});
