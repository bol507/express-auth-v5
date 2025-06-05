
import SignUpDto from "@src/domain/dtos/sign-up.dto";
import UserEntity from "@src/domain/entities/user.entitiy";
import { UserRepository } from "@src/domain/repositories/user.repository";
import boom from "@hapi/boom";
class SignUp {
  constructor( private userRepository: UserRepository) {}

  async execute(userDto: SignUpDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.getByEmail(userDto.email);
    if (existingUser) {      
      throw boom.conflict("User already exists with this email");
    }
    const user = new UserEntity(userDto.email, userDto.name, userDto.password);
    await user.hashPassword();
    
    return this.userRepository.create(user);
  }
}
  
export default SignUp;