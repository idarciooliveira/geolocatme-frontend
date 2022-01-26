import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom'
import MaterialTable from "material-table";
import api from "../services/api";

interface User{
    username: string,
    country: string,
    latitude: number,
    longitude: number,
    state: string,
    createdAt: Date
  }
  
function Dashboard(){

    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [filterResults, setFilterResult] = useState<User[]>(users);

    const { user , logout} = useContext(AuthContext);

    useEffect(()=>{
        if(!user?.isAdmin){
            return navigate('/');
        }
        api.get('/users').then(response=>{
            setUsers(response.data);
            setFilterResult(users)
        });
    })

    return (
        <div className="app">
           <div className="nav">
            <h1>Geolocatme</h1>
            <div>
                <button onClick={()=> navigate('/')} className='logout'>Voltar</button>
                <button onClick={()=> logout()} className='logout'>Logout</button>
            </div>
          </div>
          <div className='dashboardContainer'>
            <div className="filterContainer">
                <label>Filtrar por</label>
                <select>
                    <option value="">dads</option>
                </select>
                <button>Filtrar</button>
            </div>
            <MaterialTable style={{width: '100%', height: '600px', padding: 12}} 
                            title='Registros de Usuarios' columns={[
                            {title: 'Usuario', field: 'username'},
                            {title: 'Pais', field: 'country'},
                            {title: 'Provincia', field: 'state'},
                            {title: 'Registrado Em', field: 'createdAt'}]}
                            data={filterResults}/>

          </div>
        </div>
    )
}

export default Dashboard;