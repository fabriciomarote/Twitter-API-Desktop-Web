import  React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Api from "../api/api";
import Tweet from './TweetModel';
import SidePageLeft from './SidePageLeft';
import NavBar from './NavBar';
import Followers from './Followers';
import Themes from '../theme/Themes'
import { ThemeProvider } from 'styled-components';
import { ProfileContainer } from '../theme/Changes';
import '../styles/Profile.css';

const User = () => {
   const {id} = useParams ();
   const [user, setUser] = useState({ 
    name: "",
    image: "",
    followers: [],
    tweets: [],
  });

  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  const [userLogeado, setUserLogeaado] = useState({
    id:"",
    name:"",
  })

  const addFollow = (id) => {
    Api.putByFollow(id)
    Api.getUserById(id)
    .then(success =>{
      setUser((prevState) => ({
        ...prevState,
        followers: success.data.followers
      }))
     })
  };

  useEffect(() => {
    Api.getUser().then(resp => { 
      setUserLogeaado(({
        id: resp.data.id,
        name: resp.data.name,
      }))
    })
    Api.getUserById(id)
      .then(response => {
        setUser((prevState)=>({
          ...prevState,
          name: response.data.name,
          image: response.data.image,
          followers:response.data.followers,
          tweets:response.data.tweets,
        }))
      })
      .catch(error => console.log(error))
  }, [id]);

  return (
    <ThemeProvider theme={Themes[theme]}>
      <ProfileContainer>
        <div className="profile-container">
          <NavBar theme={theme}/>
          <div className="row sides-container">
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <SidePageLeft theme={theme} setTheme={setTheme}/>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 centro">
              <div className="user-data-content">
                <img className="user-img" alt="img de usuario" src={user.image} width="100" heigth="100"/>
                <strong><p className="userName">{user.name}</p>
                <p className="userId">@{id}</p></strong>
              </div>
              <div className="data-content">
                <div className="cant-followers-content">
                  <p className="cantSeguidores"><strong>{user.followers.length}</strong> Seguidores</p>
                </div>
                <div className="button-follow-content">
                  <button type="submit" className="btn-btn btn-info" id="iconsFollow" 
                    onClick={(event) => { event.preventDefault(); addFollow(id) }}>{user.followers.find(follower => follower.id === userLogeado.id)
                    ?
                    <p>Siguiendo</p>
                    : 
                    <p>Seguir</p>}        
                  </button>
                </div>
              </div>
              <div className="tweets-content">
                {user.tweets.map(tweet => <Tweet key={tweet.id} id={tweet.id} text={tweet.text} images={tweet.images} likes={tweet.likes} author={tweet.author} comments={tweet.comment} uName={userLogeado.name}></Tweet>)}
              </div>
            </div>  
            <div className="col-lg-3 col-sm-3 col-md-3 col-xs-12">
              <div className="side-right-page">
                <div className="followers-content">
                  <h5 className="followers-text">Seguidores</h5>
                </div>
                <div className="seguidores">
                  {user.followers.map(follower => <Followers key={follower.id} id={follower.id} name={follower.name} imageF={follower.image}></Followers>)}
                </div>
              </div>  
            </div>  
          </div>  
        </div>
      </ProfileContainer>
    </ThemeProvider>
  )
};

export default User;