
import SignUpDto from "@src/domain/dtos/sign-up.dto";
import UserEntity from "@src/domain/entities/user.entitiy";
import { UserRepository } from "@src/domain/repositories/user.repository";
import boom from "@hapi/boom";
import { saltAndHashPassword } from "@src/config/adapters/hash.adapter";
class SignUp {
  constructor( private userRepository: UserRepository) {}

  async execute(userDto: SignUpDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.getByEmail(userDto.email);
    
    if (existingUser) {      
      throw boom.conflict("User already exists with this email");
    }

    const hashedPassword = await saltAndHashPassword(userDto.password);

    const user = new UserEntity({
      email: userDto.email,
      name: userDto.name,
      password: hashedPassword
    });
    
    
    return this.userRepository.create(user);
  }
}
  
export default SignUp;