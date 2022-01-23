import Connect from '../assets/connect.svg'

function Register() {
    return (
      <div className="container">
        <aside>
          <img src={Connect} alt='Geolocatme'/>
        </aside>
        <main>
          <form>
            <h2>Geolocatme</h2>
            <span>Crie sua conta para poder utilizar a nossa Plataforma</span>

            <label>Nome de Usuario</label>
            <input name='username' type='text'/>

            <label>Senha</label>
            <input name='password' type='password'/>

            <label>Pais</label>
            <input name='country' type='text'/>

            <label>Provincia</label>
            <input name='state' type='text'/>

            <label>Latitude</label>
            <input name='latitude' type='number'/>
            
            <label>Longitude</label>
            <input name='longitude' type='number'/>
            
            <button type='submit'>Criar Conta</button>
            <p>OU</p>
            <a >Ja Tenho uma Conta</a>
          </form>
        </main>
      </div>
    );
  }
  
  export default Register;
  