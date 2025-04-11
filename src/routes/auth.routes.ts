import Router from "express";
import { UserModel } from "@src/interfaces/user";
import AuthController from "@src/controllers/auth.controller";

interface AuthRouterProps {
  userModel: UserModel;
}

export const AuthRouter = ({ userModel }: AuthRouterProps) => {
  const authRouter = Router();
  const authController = new AuthController({ userModel });

  authRouter.post("/signin", authController.signIn);
  authRouter.post("/signup", authController.signUp);
  //TODO: Add routes here
  //authRouter.get("/callback/github/", authController.callbackGithub);
  //authRouter.get("/callback/google", authController.callbackGoogle);

  return authRouter;
};

export default AuthRouter;