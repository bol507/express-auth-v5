import UserEntity from "../entities/user.entitiy";



export interface UserRepository {

  getById(id: string): Promise<UserEntity | null>

  getByEmail(email: string): Promise<UserEntity | null> 

  create(user: UserEntity): Promise<UserEntity>
}

