import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app: Express = express();

const API_VERSION = "/api/v1";

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

export default app;