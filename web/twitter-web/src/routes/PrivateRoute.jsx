import React from 'react'
import {
    Route,
    Redirect
  } from "react-router-dom";
import axios from 'axios';

const PrivateRoute = ({path, component}) => {
    const isLogged = !!localStorage.getItem("token");
    if (!isLogged) return <Redirect to="/login" />;
    axios.defaults.headers['authorization'] = localStorage.getItem('token');

    return (
        <Route path={path} component={component}/>
    );
}

export default PrivateRoute;

