import { Express } from "express";
import AuthRouter from "./auth.routes";
import UserModel from "@src/models/user.model";

export const registerRoutes = (app: Express, API_VERSION: string) => {
  
  //TODO: Add routes here
  app.use(`${API_VERSION}/auth`, AuthRouter({ userModel: UserModel }));
};
