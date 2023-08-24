import { Response } from 'express';
import UserService from '../services/UserService';
import { CreateUserRequest } from '../models/UserModel';
import database from '../DB';
import { validateEmail } from '../utils/validateEmail';

class UserController {
  public async signUp(req: CreateUserRequest, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;


      if (!validateEmail(email)) {
        throw Error('Email inválido')
      }

      const sql = `
        SELECT email 
        FROM User
        WHERE email = '${email}'
      `;

      await database.all(sql, (err, result) => {
        if (err || result[0]) {
          res.status(400).json({ message: 'Usuário já existe' });
        } else {
          UserService.signUp({ name, email, password });

          res.status(201).json();
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          error: 'Falha ao criar o Usuário',
          message: error.message
        });
      }
    }
  }
}

export default new UserController();
