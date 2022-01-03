import React, {useState, useEffect } from 'react';
import Api from '../api/api'
import NavBar from './NavBar';
import Tweet from './TweetModel';
import SidePageLeft from './SidePageLeft';
import Followers from './Followers';
import Themes from '../theme/Themes'
import { ThemeProvider } from 'styled-components';
import { ProfileContainer } from '../theme/Changes';
import '../styles/Profile.css';

const User = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    image: "",
    followers: [],
  });

  const [theme, setTheme] = useState(localStorage.getItem('theme'));
  
  const [tweetPost, setTweets] = useState([]);
  const [data, setData] = useState({name:"",  password:"", image:""})

  useEffect(() => {
    Api.getUser()
      .then(response => {
        setUser({
          id: response.data.id,
          name: response.data.name,
          image: response.data.image,
          followers: response.data.followers
        })
        getTweetsByUserId(response.data.id)
      })
      .catch(error => console.log(error))
  }, [data]);

  useEffect(() => {
    Api.getUser()
      .then(response => {
        setData({
          name: response.data.name,
          password: "",
          image: response.data.image,
        })
      })
      .catch(error => console.log(error))
  }, []);

  const getTweetsByUserId = (id) => {
    Api.getUserById(id)
      .then(response => {
        setTweets(
          response.data.tweets)
      })
      .catch(error => console.log(error));
  };

  const handleChange = name => event => {
    setData(prevState => ({ ...prevState, [name]: event.target.value }));
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    Api.postEditProfile(data).then(response =>{
      setUser((prevState)=>({
        ...prevState,
        name: data.name,
        image: data.image,
    }))
    }).catch(err => console.log(err));
};

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
                <p className="userId">@{user.id}</p></strong>
              </div>
              <div className="data-content">
                <div className="cant-followers-content">
                  <p className="cantSeguidores"><strong>{user.followers.length}</strong> seguidores</p>
                </div>
                <div className="button-edit-content">
                  <button type="button" className="btn-btn btn-info" data-bs-toggle="modal" data-bs-target="#modalEditProfile" data-whatever="@editProfile">Editar Perfil</button>
                  <div className="modal fade" id="modalEditProfile" tabIndex="-1" aria-labelledby="modalTitle" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="modalTitle">Editar perfil</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                              <label htmlFor="name" className="col-form-label">Nombre:</label>
                              <input type="text"  value={data.name} className="form-control" name="name" placeholder="Tu nombre aquí" onChange={handleChange("name")}></input>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="password" className="col-form-label">Contraseña:</label>
                              <input type="password" className="form-control" name="password" placeholder="Tu contraseña" onChange={handleChange("password") }></input>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="image" className="col-form-label">Imagen:</label>
                              <input type="text" value={data.image} className="form-control" placeholder="Imagen de perfil" name="image" onChange={handleChange("image")}></input>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                              <button type="submit" className="btn-btn btn-info" data-bs-dismiss="modal">Aceptar cambios</button>
                            </div>
                          </form>
                        </div>       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tweets-content">
                {tweetPost.map(tweet => <Tweet key={tweet.id} id={tweet.id} text={tweet.text} images={tweet.images} likes={tweet.likes} date={tweet.date} author={tweet.author} comments={tweet.comment} uName={user.name}></Tweet>)}
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