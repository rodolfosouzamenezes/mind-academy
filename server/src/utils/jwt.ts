import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'mind_academy';

// Middleware para gerar um token JWT
export function generateToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: '30d' });
}

// Middleware para verificar um token JWT
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token indefinido' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token Inválido' });
    }
    
    req.user = decoded;
    next();
  });
}