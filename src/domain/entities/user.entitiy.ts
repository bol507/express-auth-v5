
class UserEntity {
  id?: string | null;
  email?: string | null; 
  name?: string | null;  
  emailVerified?: Date | null; 
  image?: string | null; 
  password?: string | null; 



  constructor(data: {
    id?: string | null;
    email?: string | null;
    name?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    password?: string | null;
  }) {
    this.id = data.id || null;
    this.email = data.email;
    this.name = data.name;
    this.emailVerified = data.emailVerified || null;
    this.image = data.image || null;
    this.password = data.password;
  }
  
}

export default UserEntity;