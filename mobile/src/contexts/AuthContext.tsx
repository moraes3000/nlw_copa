import { createContext } from "react";

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>
}

interface UserProps {
  name: string
  avatarUrl: string
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  async function signIn() {
    console.log("vamos logar")
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      user: {
        name: "bruno",
        avatarUrl: 'https://avatars.githubusercontent.com/u/29808643?v=4'
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}