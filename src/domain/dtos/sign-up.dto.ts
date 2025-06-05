

class SignUpDto {
  
  readonly name: string;
  readonly email: string;
  readonly password: string;

  constructor(name: string, email: string, password: string) {
   
    this.name = name;
    this.email = email;
    this.password = password;
  }

}

export default SignUpDto;