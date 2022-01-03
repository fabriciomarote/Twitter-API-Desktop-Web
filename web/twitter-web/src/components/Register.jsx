import React, { useState } from 'react';
import logo from '../images/logo-twitter.png';
import { useHistory } from "react-router-dom";
import Api from '../api/api';
import Themes from '../theme/Themes'
import { ThemeProvider } from 'styled-components';
import { RegisterContainer } from '../theme/Changes';
import '../styles/Register.css';

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    image:"",
  })
  const history = useHistory();
  const [registerError, setregisterError] = useState (false)

  const theme = localStorage.getItem('theme');

  const handleChange = name => event => {
    setData(prevState => ({ ...prevState, [name]: event.target.value }));
  }

  const handleSubmit = (event) =>{
    event.preventDefault(); 
    Api.postRegister(data)
    .then(response => {
        localStorage.setItem("token",response.headers.authorization)
        history.push("/");
      })
      .catch(_ => setregisterError(true));
  }

  const goLogin = () => {
    history.push("/login") ;
  } 

  return (
    <ThemeProvider theme={Themes[theme]}>
      <RegisterContainer>
        <div className="register-container">
          <div className="col-lg-4 col-md-4 col-sm-3 col-xs-0" id="izquierda">
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12" id="centro">
            <div className="register-box-content">  
              <div className="logoTwitter-logout">
                <a title="logo" href="/"><img src={logo} alt="logo" height="50" width="50"/></a>  
              </div>  
              {registerError && (
                <div className="alert alert-danger" role="alert">
                  Error en Nombre, email, contraseña o imagen.
                </div>)
              }
              <div className="register-form-container">
                <form onSubmit={handleSubmit}>
                  <div className="register-text-container-1">
                    <h4>Crea tu cuenta</h4>
                  </div>
                  <div className="form-content">  
                    <div className="form-group" >
                      <input className="form-control" type="text" name="name" value={data.name} onChange={handleChange("name")} placeholder="Nombre" required />
                    </div>
                    <div className="form-group" >   
                      <input className="form-control" type="text" name="email" value={data.email} onChange={handleChange("email")} placeholder="Correo" required />
                    </div>
                    <div className="form-group" >
                      <input className="form-control" type="password" name="password" value={data.password} onChange={handleChange("password")} placeholder="Contraseña" required />
                    </div>
                    <div className="form-group" >
                      <input className="form-control" type="text" name="image" value={data.image} onChange={handleChange("image")} placeholder="Imagen" required />
                    </div> 
                  </div>  
                  <div className="register-button">
                    <button type="submit" className="btn-btn btn-info">Registrarse</button>
                  </div>     
                </form>
                <form onSubmit={goLogin} className="login">
                  <div className="register-text-container-2"> 
                    <h6>Si ya tienes una cuenta puedes:</h6>
                  </div>
                  <div className="register-button">
                    <button type="submit" className="btn-btn btn-info">Iniciar Sesión</button>
                  </div>
                </form> 
              </div>
            </div>  
          </div>  
        </div>  
      </RegisterContainer> 
    </ThemeProvider>
  )
}

export default Register;

