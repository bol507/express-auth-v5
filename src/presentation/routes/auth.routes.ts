import Router from "express";
import AuthController from "@src/presentation/controllers/auth.controller";


export const AuthRouter = () => {
  const authRouter = Router();

  authRouter.post("/signin", AuthController.signIn);
  authRouter.post("/signup", AuthController.signUp);
  //TODO: Add routes here
  //authRouter.get("/callback/github/", authController.callbackGithub);
  //authRouter.get("/callback/google", authController.callbackGoogle);

  return authRouter;
};

export default AuthRouter;