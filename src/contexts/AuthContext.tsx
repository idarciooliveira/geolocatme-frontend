import { createContext, useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import api from "../services/api";

interface AuthContextType{
    isAuthenticate: boolean,
    user: User | null,
    signIn: (data: SignInData)=> Promise<void>
    logout: ()=> void
}

interface SignInData{
    username: string,
    password: string
}

interface User{
    username: string,
    country: string,
    latitude: string,
    longitude: string,
    state: string,
    isAdmin: string
}

interface IToken{
    user: User,
    iat: string
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider : React.FC = ({children})=>{

    const [user, setUser] = useState<User | null>(null);
    const isAuthenticate = !!user;

   const signIn = async ({ username, password }: SignInData )=>{

       const response = await api.post('auth/authenticate',{ username, password});

       const token = response.data 
       const { user } = jwtDecode<IToken>(token);

       Cookies.set('@Geolocatme', token);
       Cookies.set('@GeolocatmeStone', JSON.stringify(user));

       setUser(user)
   }

    const logout = ()=> { 
        setUser(null);
    }

    useEffect(()=>{
        const userValue = Cookies.get('@GeolocatmeStone') as string;
        if(userValue){
            const user = JSON.parse(userValue)
            setUser(user)
        }
    },[])

    return (
        <AuthContext.Provider value={{isAuthenticate, user, signIn, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

