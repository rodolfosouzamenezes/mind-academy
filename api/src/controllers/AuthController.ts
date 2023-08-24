import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

import { db } from '../../DB/database';
import { generateToken } from '../utils/jwt';

class AuthController {
  async signUp(req: Request, res: Response) {
    const { name, email, password, isAdmin } = req.body;

    try {
      const user = await db.get(`
        SELECT * FROM User WHERE email = '${email}'
      `);

      if (user) {
        return res.status(409).json({ message: "Email já cadastrado" });
      }

      const id = uuid();
      const encryptedPassword = bcrypt.hashSync(password, 10)

      await db.push(`
        INSERT INTO User (id, name, email, password, isAdmin) 
          VALUES ('${id}', '${name}', '${email}', '${encryptedPassword}', ${isAdmin});
      `);

      const token = generateToken({ id, name, email, isAdmin });

      return res.status(201).json({ token });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar Usuário",
        error: error
      });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await db.get(`
        SELECT * FROM User WHERE email = '${email}'
      `);

      if (!user) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
      } else {
        const isVerifiedPassword = bcrypt.compareSync(password, user.password);

        if (!isVerifiedPassword) {
          return res.status(401).json({ message: 'Email ou senha inválidos' });
        } 
      
        const token = generateToken({ 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          isAdmin: user.isAdmin, 
        });

        return res.status(200).json({ token });
      }
    } catch (error) {
      return res.status(500).json({
        error,
        message: "Erro ao logar"
      });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await db.get_all(`
      SELECT id, name, email, isAdmin FROM User
    `);

    return res.status(200).json({ users });
  }

  async me(req: Request, res: Response) {
    const user = req.user;    

    if (user) {
      return res.status(200).json({ user });
    }
  }
}

export default new AuthController();