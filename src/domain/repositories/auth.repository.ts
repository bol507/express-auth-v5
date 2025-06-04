import SignInDto from "../dtos/sign-in.dto";
import SignUpDto from "../dtos/sign-up.dto";
import UserEntity from "../entities/user.entitiy";


export interface AuthRepository {

  SignIn(signInDto: SignInDto): Promise<UserEntity>
  SignUp(signUpDto: SignUpDto): Promise<UserEntity>

} 

