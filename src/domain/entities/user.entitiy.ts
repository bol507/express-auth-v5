import Joi, { optional } from "joi";
import bcrypt from "bcryptjs";

class UserEntity {
  id: string;
  email?: string | null; 
  name?: string | null;  
  emailVerified?: Date | null; 
  image?: string | null; 
  password?: string | null; 

  private static schema = Joi.object({
    id: Joi.string().optional(),
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30),optional,
    password: Joi.string().min(6).required(),
  });

  constructor(
    id: string,
    email?: string | null,
    name?: string | null,
    emailVerified?: Date | null,
    image?: string | null,
    password?: string | null
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.emailVerified = emailVerified;
    this.image = image;
    this.password = password;
  }

  validate(): Joi.ValidationResult {
    return UserEntity.schema.validate(this);
  }

  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    if (!this.password) return false;
    return await bcrypt.compare(password, this.password);
  }
  
}

export default UserEntity;