import { useEffect, useState } from 'react';
import {MapContainer,TileLayer, Marker, Popup} from 'react-leaflet'
import useAuth from '../contexts/useAuth';
import api from '../services/api';


interface User{
  username: string,
  country: string,
  latitude: number,
  longitude: number,
  state: string,
}

function Home() {

  const [usersLocations, setUserLocations] = useState<User[]>([]);
  const { user, logout } = useAuth();

  useEffect(()=>{
    api.get('/users').then(response=>{
      setUserLocations(response.data)
    })
  },[])

    return ( 
        <div className="app">
          <div className="nav">
            <h1>Geolocatme</h1>
            <button onClick={
              ()=> logout()
            } className='logout'>Logout</button>
          </div>
              <MapContainer 
                      center={[user?.latitude || -8.838333,user?.longitude || 13.234444 ]}
                      zoom={20} scrollWheelZoom={true}>
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
    );
  }
  
  export default Home;
  