import boom from "@hapi/boom";
import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export enum Property {
  BODY = 'body',
  QUERY = 'query',
  PARAMS = 'params'
}

export const validateRequest = (schema: Schema, property: Property) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const data = request[property];
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      next(boom.badRequest(error.message, { details: error.details }));
    } else {
      next();
    }   
  };
};

export default validateRequest;