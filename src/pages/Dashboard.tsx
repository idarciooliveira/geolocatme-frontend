import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom'
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

    const { user , logout} = useContext(AuthContext);

    useEffect(()=>{
        if(!user?.isAdmin){
            return navigate('/');
        }
        api.get('/users').then(response=>{
            setUsers(response.data);
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
          <div className="card">
              <div className="header">
                    <label className='title'>Filtrar Por</label>
                    <select name="time" id="">
                        <option value="week">Semana</option>
                        <option value="month">Mês</option>
                        <option value="year">Ano</option>
                    </select>
              </div>
             <div className="content">
                <table>
                    <tr>
                        <th>User</th>
                        <th>Pais</th>
                        <th>Província</th>
                        <th>Data de Registro</th>
                    </tr>
                    {users.length && users.map(user=>(
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <td>{user.country}</td>
                            <td>{user.state}</td>
                            <td>{user.createdAt}</td>
                        </tr>
                    ))}
                </table>

                <p className='counter'>Registros: {users.length}</p>

             </div>
          </div>
        </div>
    )
}

export default Dashboard;