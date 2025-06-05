import { NextFunction, Request, Response } from "express";
import SignIn from "@src/application/use-cases/sign-in";
import SignUp from "@src/application/use-cases/sign-up";
import UserRepositoryImpl from "@src/infrastructure/repositories/user.repository.impl";
import SignInDto from "@src/domain/dtos/sign-in.dto";
import SignUpDto from "@src/domain/dtos/sign-up.dto";
import boom from "@hapi/boom";
class AuthController {

  constructor(
    private userRepository: UserRepositoryImpl = new UserRepositoryImpl(),
    private signUpUseCase: SignUp = new SignUp(userRepository),
    private signInUseCase: SignIn = new SignIn(userRepository)
  ) {}

  async signIn(req: Request, res: Response, next: NextFunction) { 
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(boom.badRequest("Email and password are required"));
      }

      const signInDto = new SignInDto(email, password);
      const user = await this.signInUseCase.execute(signInDto);
      res.status(200).json(user);
    } catch (error) {
      next(error)
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return next(boom.badRequest("Name, email, and password are required"));
      }
      const signUpDto = new SignUpDto(name, email, password);
      const user = await this.signUpUseCase.execute(signUpDto);
      res.status(201).json(user);
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController;