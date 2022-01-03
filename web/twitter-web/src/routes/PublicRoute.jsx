import React from 'react'
import {
    Route,
    Redirect
  } from "react-router-dom";

const PublicRoute = ({path, component}) => {
    const isLogged = !!localStorage.getItem("token");
    if (isLogged) return <Redirect to="/home" />;

    return (
        <Route path={path} component={component}/>
    );
}

export default PublicRoute;

