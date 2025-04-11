import { UserModel } from "@src/interfaces/user";
import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";
import { saltAndHashPassword, verifyPassword } from "@src/utils/password";
import JWTToken from "@src/utils/jwt.token";

const jwtToken = new JWTToken();

export default class AuthController {
  
  private userModel: UserModel

  constructor({userModel}: {userModel: UserModel}) {
    this.userModel = userModel
  }

  signIn = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try {
      const { email, password } = req.body;
      if(!email || !password) {
        throw boom.badRequest("Email and password are required");
      }

      const userDb = await this.userModel.getByEmail(email);
      if(!userDb) {
        throw boom.badRequest("Invalid credentials");
      }

      const isPasswordValid = await verifyPassword(password, userDb.password!);
      if(!isPasswordValid) {
        throw boom.badRequest("Invalid credentials");
      }

      const token = jwtToken.generate({ id: userDb.id, email });
      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).json({ message: "Authentication successful" });

    } catch (error) {
      next(error);
    }
  }//end signIn

  signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password, name } = req.body;
      if (!email || !password || !name) {
        throw boom.badRequest("Email, password and name are required");
      }

      const userDb = await this.userModel.getByEmail(email);
      if (userDb) {
        throw boom.badRequest("Something went wrong");
      }

      const hashedPassword = await saltAndHashPassword(password);
      const newUser = await this.userModel.create({
        email,
        password: hashedPassword,
        name
      });

      const token = jwtToken.generate({ id: newUser.id, email });
      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      next(error);
    }
  }//end signUp
}//end AuthController