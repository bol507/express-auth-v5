import express, { Request, Response, Express, NextFunction, ErrorRequestHandler } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
import { registerRoutes } from "./routes";
import { errorHandler } from "./utils/error.handler";

dotenv.config();
const app: Express = express();

const API_VERSION = "/api/v1";

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

registerRoutes(app, API_VERSION);

// Error handling middleware should be the last middleware
app.use(((err: Error, req: Request, res: Response, next: NextFunction) => {
  return errorHandler(err, req, res, next);
}) as ErrorRequestHandler);

export default app;