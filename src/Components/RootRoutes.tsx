import { Navigate } from 'react-router-dom'
import useAuth from "../contexts/useAuth"


export const RootRoutes : React.FC = ({children})=>{

    const { isAuthenticate, user } = useAuth();

    if(isAuthenticate || user?.isAdmin){
        return <Navigate to='/' replace/>
    }

    return (
        <>{children}</>
    )
}

