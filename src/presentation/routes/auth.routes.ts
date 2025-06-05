import Router, { Request, Response, NextFunction } from "express";
import AuthController from "@src/presentation/controllers/auth.controller";
import rateLimit from 'express-rate-limit';
import validateRequest, { Property } from "@src/infrastructure/middleware/validation.middleware";
import { signInSchema, signUpSchema } from "@src/domain/schemas/auth.schemas";



const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.'
});

export const AuthRouter = () => {
  const authRouter = Router();
  const authController = new AuthController();

  authRouter.post(
    "/signin",
    authLimiter,
    validateRequest(signInSchema, Property.BODY),
    async (req: Request, res: Response, next: NextFunction): Promise<void>  => {
      await authController.signIn(req, res, next);
    }
  );

  authRouter.post(
    "/signup",
    authLimiter, 
    validateRequest(signUpSchema, Property.BODY),
    async (req: Request, res: Response, next: NextFunction): Promise<void>  => {
      await authController.signUp(req, res, next);
    }
  );
  //TODO: Add routes here
  //authRouter.get("/callback/github/", authController.callbackGithub);
  //authRouter.get("/callback/google", authController.callbackGoogle);

  return authRouter;
};

export default AuthRouter;