import Connect from '../assets/connect.svg'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import api from '../services/api';

interface IFormInput{
  username: string,
  country: string,
  password: string,
  latitude: string,
  longitude: string,
  state: string,
}

function Register() {

  const {handleSubmit, register, formState: { errors } , reset} = useForm<IFormInput>();

  const onSubmit = async(values : IFormInput)=>{
    await api.post('/users/register',{
      ...values
    })

    alert('Cadastrado!')
  }

  return (
      <div className="container">
        <aside>
          <img src={Connect} alt='Geolocatme'/>
        </aside>
        <main>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Geolocatme</h2>
            <span>Crie sua conta para poder utilizar a nossa Plataforma</span>

            <label>Nome de Usuario</label>
            <input {...register('username', { required: true })} type='text'/>

            <label>Senha</label>
            <input {...register('password', { required: true })} type='password'/>

            <label>Pais</label>
            <input {...register('country', { required: true })} type='text'/>

            <label>Provincia</label>
            <input {...register('state', { required: true })} type='text'/>

            <label>Latitude</label>
            <input {...register('latitude', { required: true })} type='number'/>
            
            <label>Longitude</label>
            <input {...register('latitude', { required: true })} type='number'/>
            
            <button type='submit'>Criar Conta</button>
            <p>OU</p>
            <Link to='/login'>Ja Tenho uma Conta</Link>
          </form>
        </main>
      </div>
    );
  }
  
  export default Register;

  