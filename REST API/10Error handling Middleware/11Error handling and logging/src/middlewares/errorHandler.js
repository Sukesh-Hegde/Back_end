// Please don't change the pre-written code
// Import the necessary modules here
import { logger } from "./logger.middleware.js";
export class customErrorHandler extends Error {
  constructor(statusCode, errMessage) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  // Write your code here
  if (err instanceof customErrorHandler) {
  const logData = `TimeStamp:${new Date().toString()}\n req URL: ${
    req.originalUrl
  }error message:${err.message}`;
  logger.error(logData);
  res.status(err.statusCode).send(err.message);
  } else {
    const logData = `TimeStamp:${new Date().toString()}\n req URL: ${
      req.originalUrl
    }error message:${"oops! something went wrong...Try again later!"}`;
    logger.error(logData);
    res.status(500).send("oops! something went wrong...Try again later!");
  }
  next();
};
