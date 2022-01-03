import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Api from '../api/api';
import logo from '../images/logo-twitter.png';
import Themes from '../theme/Themes'
import { ThemeProvider } from 'styled-components';
import { LoginContainer } from '../theme/Changes';
import '../styles/Login.css';

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const theme = localStorage.getItem('theme');

  const history = useHistory();
  const [loginError, setLoginError] = useState (false)

  const goRegister = () => {
    history.push("/register") ;
  };

  const handleChange = name => event => {
    setData(prevState => ({ ...prevState, [name]: event.target.value }));
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    Api.postLogin(data)
    .then(response => {
        localStorage.setItem("token",response.headers.authorization)
        history.push("/home");
      })
      .catch(_ => setLoginError(true));
  }

    return (
      <ThemeProvider theme={Themes[theme]}>
        <LoginContainer>
          <div className="login-container">
            <div className="col-lg-4 col-md-4 col-sm-3 col-xs-0" id="izquierda">
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12" id="centro">
              <div className="login-box-content">  
                <div className="logoTwitter-logout">
                  <a title="logo" href="/"><img className="logo" src={logo} alt="logo" height="50" width="50"/></a>  
                </div>  
                {loginError && (<div className="alert alert-danger" role="alert">Bad email or password</div>) }
                <div className="login-text-container-1">
                  <h1>Iniciar Sesión en Twitter</h1> 
                </div>
                <div className="login-form-container">
                  <form onSubmit={handleSubmit}>  
                    <div className="login-form-group">
                      <input className="form-control" type="text" name="email" value={data.email} onChange={handleChange("email")} placeholder="Correo" required />
                    </div>
                    <div className="login-form-group" >
                      <input className="form-control" type="password" name="password" value={data.password} onChange={handleChange("password")} placeholder="Contraseña" required />
                    </div>
                    <div className="login-button-content">
                      <button type="submit" className="btn-btn btn-info">Iniciar sesion</button>
                    </div>
                  </form>
                  <form onSubmit={goRegister}>
                    <div className="login-text-container-2">
                      <h6>¿No tenes cuenta?</h6>
                    </div>
                    <div className="button-link-content">  
                      <button type="submit" className="btn btn-link">Registrate en Twitter</button>
                    </div>
                  </form> 
                </div>
              </div>  
            </div>
            <div className="col-lg-4 col-md-4 col-sm-3 col-xs-0" id="derecha">
            </div>
          </div>  
        </LoginContainer>
      </ThemeProvider>
    )  
}

export default Login ;