import { React, useState } from 'react';
import logo from '../images/logo-twitter.png';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Themes from '../theme/Themes'
import { ThemeProvider } from 'styled-components';
import { NavBarContainer } from '../theme/Changes';
import '../styles/NavBar.css';

const NavBar = (props) => {

    const { theme } = props;

    const [search, setSearch] = useState({
        query: '',
        result: []
    });

    const history = useHistory();

    const changeSearch = (event) => setSearch(event.target.value);

    const logout = () => {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        history.push("/");
    };

    return (
        <ThemeProvider theme={Themes[theme]}>
            <NavBarContainer>    
                <nav>
                    <div className='row' id="navbar">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <div className="nav-logo-twitter">
                                <a title="logo" href="/home"><img src={logo} alt="logo" height="40" width="40" /></a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <form className="search-content">
                                <input className="form-control me-2" type="text" placeholder="Buscar en Twitter" aria-label="Search" onChange={changeSearch} />
                                <Link to={`/search?q=${search}`}>
                                    <button className="btn btn-outline-success" hidden="hidden">Search</button>
                                </Link>
                            </form>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <form onSubmit={logout} className="button-content">
                                <button type="submit" className="btn-btn btn-info" id="btn-logout">
                                    Cerrar Sesion
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>  
            </NavBarContainer>
        </ThemeProvider>     
    );
};

export default NavBar;