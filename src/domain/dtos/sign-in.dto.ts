import boom from "@hapi/boom";

class SignInDto {
  
  readonly email: string;
  readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }



}

export default SignInDto;