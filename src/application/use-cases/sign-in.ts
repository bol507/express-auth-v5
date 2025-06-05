
import SignInDto from "@src/domain/dtos/sign-in.dto";
import UserEntity from "@src/domain/entities/user.entitiy";
import { UserRepository } from "@src/domain/repositories/user.repository";
import boom from "@hapi/boom";
class SignIn {
  constructor( private userRepository: UserRepository) {}

  async execute(userDto: SignInDto): Promise<UserEntity> {
    if (!userDto.email || !userDto.password) {
      throw boom.badRequest("Email and password are required");
    }
    const existingUser = await this.userRepository.getByEmail(userDto.email);
    if (!existingUser) {      
      throw boom.unauthorized("User not found");
    }
    const isPasswordValid = await existingUser.comparePassword(userDto.password);
    if (!isPasswordValid) {
      throw boom.unauthorized("password is incorrect");
    }

    return existingUser;
  }
}

export default SignIn;