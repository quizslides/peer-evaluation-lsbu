import pino from "pino";

const logger: pino.Logger = pino();

const infoLogger = (message: string | object): void => {
  logger.info(message);
};

const errorLogger = (message: string | object): void => {
  logger.error(message);
};

export { errorLogger, infoLogger, logger };
