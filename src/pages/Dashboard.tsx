import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom'
import Dropdown, { Option } from 'react-dropdown';
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
    const [registerNumber, setRegisterNumber] = useState<number>(0);
    const [optionSelected, setOptionSelected] = useState<Option>()

    const { user , logout} = useContext(AuthContext);

    useEffect(()=>{
        if(!user?.isAdmin){
            return navigate('/');
        }
        api.get('/users').then(response=>{
            setUsers(response.data);
            setRegisterNumber(users.length)
        });
    },[])

    const handlefilter = ()=>{
        if(optionSelected){
            // Mesmo ano
            if(optionSelected.value === 'year'){
                const results = users.filter(user=> new Date(user.createdAt).getFullYear() === new Date().getFullYear());
                setRegisterNumber(results.length)
            }
            //Mesmo ano, Mesmo mes
            else if(optionSelected.value === 'month'){
                const results = users.filter(user=> 
                               ( new Date(user.createdAt).getFullYear() === new Date().getFullYear())
                               && (new Date(user.createdAt).getMonth() === new Date().getMonth()));
                setRegisterNumber(results.length)
            }
            // Mesmo ano, mesmo mes, mesmo dia
            else if(optionSelected.value === 'day'){
                const results = users.filter(user=> 
                               ( new Date(user.createdAt).getFullYear() === new Date().getFullYear())
                               && (new Date(user.createdAt).getMonth() === new Date().getMonth())
                               && (new Date(user.createdAt).getDay() === new Date().getDay()));
                setRegisterNumber(results.length)
            }
        }
    }

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
              {registerNumber &&  <span className='register'>Total de Registros Recebidos: {registerNumber}</span>}
                <div className="filterContainer">
                    <label>Exibir Registror por</label>
                    <Dropdown onChange={(value)=> setOptionSelected(value)} className='dropdown' 
                            options={[
                                {value: 'day', label: 'Dia'},
                                {value: 'month', label: 'Mes'},
                                {value: 'year', label: 'Ano'}
                            ]} 
                            placeholder="Selecione o intervalo de tempo" />
                    <button type='button' onClick={handlefilter}>Exibir</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;