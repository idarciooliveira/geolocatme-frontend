import Connect from '../assets/connect.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api from '../services/api';

interface IFormInput{
  username: string,
  country: string,
  password: string,
  latitude: number,
  longitude: number,
  state: string,
}

function Register() {

  const navigate = useNavigate();
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
            {errors.username && <span>Campo Obrigatorio</span>}

            <label>Senha</label>
            <input {...register('password', { required: true })} type='password'/>
            {errors.password && <span>Campo Obrigatorio</span>}

            <label>Pais</label>
            <input {...register('country', { required: true })} type='text'/>
            {errors.country && <span>Campo Obrigatorio</span>}

            <label>Provincia</label>
            <input {...register('state', { required: true })} type='text'/>
            {errors.state && <span>Campo Obrigatorio</span>}

            <label>Latitude</label>
            <input {...register('latitude', { required: true })} type='number'/>
            {errors.latitude && <span>Campo Obrigatorio</span>}

            <label>Longitude</label>
            <input {...register('longitude', { required: true })} type='number'/>
            {errors.longitude && <span>Campo Obrigatorio</span>}

            <button type='submit'>Criar Conta</button>
            <p>OU</p>
            <Link to='/login'>Ja Tenho uma Conta</Link>
          </form>
        </main>
      </div>
    );
  }
  
  export default Register;

  