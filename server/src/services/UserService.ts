import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import { UserPayload } from '../models/UserModel';
import UserRepository from '../repositories/UserRepository';

class UserService {
  public async signUp({ name, email, password }: UserPayload) {
    const encryptedPassword = bcrypt.hashSync(password, 10)
    const id = uuid();

    await UserRepository.signUp({ id, name, email, password: encryptedPassword });
  }
}

export default new UserService();
