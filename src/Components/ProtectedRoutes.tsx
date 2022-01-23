import { Navigate } from 'react-router-dom'
import useAuth from "../contexts/useAuth"


export const ProtectedRoutes : React.FC = ({children})=>{

    const { isAuthenticate } = useAuth();

    if(!isAuthenticate){
        console.log(isAuthenticate)
        return <Navigate to='/login' replace/>
    }

    return (
        <>{children}</>
    )
}

