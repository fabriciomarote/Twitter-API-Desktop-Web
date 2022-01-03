import React from 'react';
import { useHistory } from "react-router-dom"
import logo from '../images/logo-twitter.png'
import Themes from '../theme/Themes'
import { ThemeProvider } from 'styled-components';
import { MainPageContainer } from '../theme/Changes';
import '../styles/MainPage.css';

const MainPage = () => {

  const theme = localStorage.getItem('theme');

  const history = useHistory();

  const goRegister = () => {
    history.push("/register") ;
  }

  const goLogin = () => {
    history.push("/login") ;
  }  

  return (
    <ThemeProvider theme={Themes[theme]}>
      <MainPageContainer>
        <div className="container">
          <div className="col-lg-4 col-md-4 col-sm-0 col-xs-0">
          </div>
          <div className="col-lg-4 col-md-4 col-sm-8 col-xs-12">
            <div className="box-content">     
              <div className="logoTwitter-logout">
                <a href="/"><img className="logo" src={logo} alt="logo" height="50" width="50"/></a>  
              </div>  
              <div className="text-content">
                <h1>Lo que está pasando ahora</h1>
                <h3>Únete a Twitter hoy mismo.</h3>  
              </div>
              <div className="button-content">
                <form onSubmit={goRegister} className="btn-mainPage">
                  <button type="submit" className="btn-btn btn-info">Regístrate</button>
                </form>
                <form onSubmit={goLogin} className="btn-mainPage">
                  <button type="submit" id="button-login" className="btn-btn btn-info">Iniciar Sesión</button>
                </form>         
              </div>                  
            </div>       
          </div>
          <div className="col-lg-4 col-md-4 col-sm-0 col-xs-0">
          </div>
        </div>
      </MainPageContainer>
    </ThemeProvider>
  )
}

export default MainPage;

