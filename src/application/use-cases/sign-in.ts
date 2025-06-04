
import SignInDto from "@src/domain/dtos/sign-in.dto";
import UserEntity from "@src/domain/entities/user.entitiy";
import { UserRepository } from "@src/domain/repositories/user.repository";

class SignIn {
  constructor( private userRepository: UserRepository) {}

  async execute(userDto: SignInDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.getByEmail(userDto.email);
    if (!existingUser) {      
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await existingUser.comparePassword(userDto.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    return existingUser;
  }
}

export default SignIn;