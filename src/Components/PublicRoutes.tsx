import { Navigate } from 'react-router-dom'
import useAuth from "../contexts/useAuth"


export const PublicRoutes : React.FC = ({children})=>{

    const { isAuthenticate } = useAuth();

    if(isAuthenticate){
        return <Navigate to='/' replace/>
    }

    return (
        <>{children}</>
    )
}

