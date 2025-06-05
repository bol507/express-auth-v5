import { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";
import logger from "../../config/logger";

const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("Middleware: ErrorHandler : ", err.message, err.name);

  if (boom.isBoom(err)) {
    const { output } = err
    return res.status(output.statusCode).json(output.payload);
  }

  handleSpecificError(err, res);
};

const handleSpecificError = (error: Error, response: Response) => {
  switch (error.name) {
    case "CastError":
      return response
        .status(HTTP_STATUS.BAD_REQUEST)
        .send({ error: "malformatted id" });
    case "ValidationError":
      return response
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: error.message });
    case "JsonWebTokenError":
    case "TokenExpiredError":
      return response.status(HTTP_STATUS.UNAUTHORIZED).json({
        error:
          error.name === "TokenExpiredError" ? "token expired" : error.message
      });
    case "BadRequest":
      return response
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: error.message });
    case "Unauthorized":
      return response
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ error: error.message });
    case "NotFound":
      return response
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: error.message });
    default:
      return response
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({error: "Internal Server Error"});
  }
};