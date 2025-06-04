import { NextFunction, Request, Response } from "express";
import SignIn from "@src/application/use-cases/sign-in";
import SignUp from "@src/application/use-cases/sign-up";
import UserRepositoryImpl from "@src/infrastructure/repositories/user.repository.impl";
import SignInDto from "@src/domain/dtos/sign-in.dto";
import SignUpDto from "@src/domain/dtos/sign-up.dto";


const userRepository = new UserRepositoryImpl();
const signUp = new SignUp(userRepository);
const signIn = new SignIn(userRepository);

class AuthController {

  static async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const signInDto = new SignInDto(req.body.email, req.body.password);
      const user = await signIn.execute(signInDto);
      res.status(200).json(user);
    } catch (error) {
      next(error)
    }
  }

  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const signUpDto = new SignUpDto(req.body.name, req.body.email, req.body.password);
      const user = await signUp.execute(signUpDto);
      res.status(201).json(user);
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController;