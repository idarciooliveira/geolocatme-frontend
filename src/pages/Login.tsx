import { Link , useNavigate } from 'react-router-dom'
import Map from '../assets/map.svg';
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


type IFormInput = {
  username: string,
  password: string
}

function SignIn() {

  const navigator = useNavigate();

  const { signIn } = useContext(AuthContext);

  const {handleSubmit, register, formState: { errors } , reset} = useForm<IFormInput>();


  const onSubmit = async ({username, password}: IFormInput)=>{
      await signIn({
        username,
        password
      });

      reset();

      navigator('/');

  }

  return (
    <div className="container">
      <aside>
        <img src={Map} alt='Geolocatme'/>
      </aside>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Geolocatme</h2>
          <h3>Seja ben-vindo</h3>

          <label>Nome de Usuario</label>
          <input {...register('username', { required: true })} type='text'/>
          {errors.username && <span>Campo Obrigatorio</span>}

          <label>Senha</label>
          <input {...register('password', { required: true })} type='password'/>
          {errors.password && <span>Campo Obrigatorio</span>}

          <button type='submit'>Entrar</button>
          <p>OU</p>
          <Link to='/register'>Criar uma conta</Link>

        </form>
      </main>
    </div>
  );
}

export default SignIn;
