import pino from "pino";

const logger: pino.Logger = pino();

const infoLogger = (message: string): void => {
  logger.info(message);
};

const errorLogger = (message: string): void => {
  logger.error(message);
};

export { errorLogger, infoLogger, logger };
