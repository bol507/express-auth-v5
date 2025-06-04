import { Express } from "express";
import AuthRouter from "./auth.routes";


export const registerRoutes = (app: Express, API_VERSION: string) => {
  app.use(`${API_VERSION}/auth`, AuthRouter());
  
}