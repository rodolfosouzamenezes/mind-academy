import { Request } from 'express';

// Dados recebidos do User 
export interface UserPayload {
  name: string;
  email: string;
  password: string;
}

//Dados do User no body do Rest
export interface CreateUserRequest extends Request {
  body: UserPayload
}


// Dados do User no banco de dados 
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
};
