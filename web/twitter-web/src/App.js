import React from 'react';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import User from './components/User';
import Tweet from './components/Tweet';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Search from './components/Search';
import AddTweet from './components/AddTweet';

const App = () => {
  return (
    <Router>  
      <Switch>
        <PublicRoute path="/mainPage" component={MainPage}/>
        <PublicRoute path="/login" component={Login}/>
        <PublicRoute path="/register" component={Register}/>
        <PrivateRoute path="/home" component={Home}/>
        <PrivateRoute path="/profile" component={Profile}/>
        <PrivateRoute path="/user/:id" component={User}/>
        <PrivateRoute path="/search" component={Search}/>
        <PrivateRoute path="/tweet/:id" component={Tweet}/>
        <PrivateRoute path="/tweet" component={AddTweet}/>
        <PublicRoute path="*" component={MainPage}/>
      </Switch>     
    </Router>
  );
}

export default App;