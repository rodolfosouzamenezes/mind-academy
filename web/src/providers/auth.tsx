import React, { createContext, useState } from "react";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode,
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({id: '1', email: "teste@gmail.com", name: "Teste", isAdmin: true} as UserProps)

  const signIn = async () => {
    
  }

  const logout = async () => {
    try {
      setUser({} as UserProps);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      logout,
      user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}