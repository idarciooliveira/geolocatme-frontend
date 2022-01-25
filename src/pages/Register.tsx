import Connect from '../assets/connect.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api from '../services/api';
import { useEffect, useState } from 'react';
import countriesData from '../services/countries.json'

interface IFormInput{
  username: string,
  country: string,
  password: string,
  latitude: number,
  longitude: number,
  state: string,
}

interface ICountry{
  name: string
}

function Register() {

  const navigate = useNavigate();
  const [countries, setCountries] = useState<ICountry[]>([])
  const { handleSubmit, register, formState: { errors }, reset } = useForm<IFormInput>();

  const onSubmit = async(values : IFormInput)=>{
    try {
      await api.post('/users/register',{
        ...values
      })

      reset();
      navigate('/login');
      
      toast('A sua conta foi criada com sucesso!',{
        type:'success'
      })
    } catch (error) {
      toast('Ocorreu um erro! O nome de usuario ja existe',{
        type: 'error'
      })
    }
  }

  useEffect(()=>{
    setCountries(countriesData);
  },[])

  return (
      <div className="container">
        <aside>
          <img src={Connect} alt='Geolocatme'/>
        </aside>
        <main>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Geolocatme</h2>
            <h3>Crie sua conta para poder utilizar a nossa Plataforma</h3>

            <label>Nome de Usuario</label>
            <input {...register('username', { required: true })} type='text'/>
            {errors.username && <span>Campo Incorreto!</span>}

            <label>Senha</label>
            <input {...register('password', { required: true })} type='password'/>
            {errors.password && <span>Campo Incorreto!</span>}

            <label>Pais</label>
            <select {...register('country', { required: true })} required>
              {countries.length > 0 && countries.map(country=>(
                  <option key={country.name} value={country.name}>
                              {country.name}
                  </option>
              ))}
            </select>

            <label>Provincia</label>
            <input {...register('state', { required: true })} type='text'/>
            {errors.state && <span>Campo Incorreto!</span>}

            <label>Latitude</label>
            <input {...register('latitude', { required: true })} type='text'/>
            {errors.latitude && <span>Campo Incorreto!</span>}

            <label>Longitude</label>
            <input {...register('longitude', { required: true })} type='text'/>
            {errors.longitude && <span>Campo Incorreto</span>}

            <button type='submit'>Criar Conta</button>
            <p>OU</p>
            <Link to='/login'>Ja Tenho uma Conta</Link>
          </form>
        </main>
      </div>
    );
  }
  
  export default Register;

  