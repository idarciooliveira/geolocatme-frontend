import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {MapContainer,TileLayer, Marker, Popup } from 'react-leaflet'
import MaterialTable from 'material-table';

import useAuth from '../contexts/useAuth';
import api from '../services/api';
import { Map } from 'leaflet';


interface User{
  username: string,
  country: string,
  latitude: number,
  longitude: number,
  state: string,
}

function Home() {

  const navigate = useNavigate();
  const [map, setMap]= useState<Map>(null);

  const [usersLocations, setUserLocations] = useState<User[]>([]);
  const { user, logout } = useAuth();

  useEffect(()=>{
    api.get('/users').then(response=>{
      setUserLocations(response.data)
    })
  },[])

  const handleLogout = ()=> logout();
  const handleDashboard = ()=> navigate('/dashboard');

  const handleLocate = ({ longitude, latitude }: User)=>{
    if(map){
      map.flyTo([latitude,longitude], 12)
    }
  }

    return ( 
        <div className="app">
          <div className="nav">
            <h1>Geolocatme</h1>
            <div>
              {user?.isAdmin && <button onClick={handleDashboard} className='logout'>Dashboard</button>}
              <button onClick={handleLogout} className='logout'>Logout</button>
            </div>
          </div>
          <div className='appContainer'>
            <MaterialTable  style={{width: '100%', height: 'auto', 
                                    maxHeight: '600px', padding: 12}} 
                            title='Usuarios' columns={[
                            {title: 'User', field: 'username'},
                            {title: 'Pais', field: 'country'},
                            {title: 'Provincia', field: 'state'},
                            { 
                              render: (selectedUser)=> (
                                <button onClick={()=> handleLocate(selectedUser)} className='btnAction'>
                                  Localizar
                                </button>
                              )
                            }
                            ]} data={usersLocations}/>

            <MapContainer whenCreated={setMap} center={[user?.latitude || -8.838333,user?.longitude || 13.234444 ]}
                        zoom={20} scrollWheelZoom={true}  >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {usersLocations?.length > 0 && usersLocations?.map(user=>(
                    <Marker key={user.username} position={[user.latitude, user.longitude]}>
                      <Popup>
                        {user.username} 
                      </Popup>
                    </Marker>
                  ))}
            </MapContainer> 
          </div>
      </div>
    );
  }
  
  export default Home;
  