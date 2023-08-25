import React, { createContext, useState } from "react";
import { api } from "../lib/axios";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthContextDataProps {
  user: UserProps;
  login: (user: { email: string, password: string }) => Promise<boolean>;
  signup: (user: { name: string, email: string, password: string }) => Promise<boolean>;
  logout: () => void;
  getMe: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode,
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    // id: '1', email: "teste@gmail.com", name: "Teste", isAdmin: true
  } as UserProps)

  const signup = async (user: { name: string, email: string, password: string }) => {
    try {
      const response = await api.post('/signup', user).then(res => {
        return res.data;
      })

      if(response.id) {
        localStorage.setItem('token', response.token);
        setUser({
          email: response.email,
          id: response.id,
          name: response.name,
          isAdmin: response.isAdmin
        })
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const login = async (user: { email: string, password: string }) => {    
    try {
      const response = await api.post('/login', user).then(res => {
        return res.data;
      })

      if(response.id) {
        localStorage.setItem('token', response.token);
        setUser({
          email: response.email,
          id: response.id,
          name: response.name,
          isAdmin: response.isAdmin
        })
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const getMe = async () => {
    try {
      await api.get('/me').then(res => {
        const userInfo = res.data.user;
        setUser({
          email: userInfo.email,
          id: userInfo.id,
          name: userInfo.email,
          isAdmin: userInfo.isAdmin,
        })
      })
    } catch (err) {
      console.log(err);
      
    }
  }

  const logout = async () => {
    try {
      localStorage.removeItem('token');
      setUser({} as UserProps);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{
      signup,
      login,
      getMe,
      logout,
      user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}