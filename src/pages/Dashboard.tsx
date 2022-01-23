import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


function Dashboard(){

    const { user } = useContext(AuthContext);

    return (
        <div className="app">
           <h2>Welcome, {user?.username}</h2>
        </div>
    )
}

export default Dashboard;