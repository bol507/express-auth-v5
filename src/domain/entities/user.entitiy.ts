import Joi, { optional } from "joi";
import { saltAndHashPassword, verifyPassword } from "@src/config/adapters/hash.adapter";

class UserEntity {
  id?: string | null;
  email?: string | null; 
  name?: string | null;  
  emailVerified?: Date | null; 
  image?: string | null; 
  password?: string | null; 

  private static schema = Joi.object({
    id: Joi.string().optional(),
    email: Joi.string().email().optional(),
    name: Joi.string().min(2).max(30).optional,
    password: Joi.string().min(6).required(),
  });

  constructor(
    id?: string | null,
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

  async hashPassword(): Promise<UserEntity> {
    if (!this.password) return this;
    const hashedPassword = await saltAndHashPassword(this.password);
    
    return new UserEntity(
      this.id,
      this.email,
      this.name,
      this.emailVerified,
      this.image,
      hashedPassword
    );
  }

  async comparePassword(password: string): Promise<boolean> {
    if (!this.password) return false;
    return await verifyPassword(password, this.password);
  }
  
}

export default UserEntity;