import database from '../DB';
import { IUser } from '../models/UserModel';
import { logError } from '../utils/logError';

class UserRepository {
  public async signUp({ id, name, email, password }: IUser) {
    const sql = `
      INSERT INTO User (id, name, email, password) VALUES (?, ?, ?, ?)
    `
    const params = [id, name, email, password];

    database.run(sql, params, (err) => logError(err, 'Create new User'));
  }
}

export default new UserRepository();