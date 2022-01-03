import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import Api from "../api/api";
import NavBar from "./NavBar";
import SidePageLeft from "./SidePageLeft";
import Themes from '../theme/Themes'
import { ThemeProvider } from 'styled-components';
import { SearchContainer } from '../theme/Changes';
import '../styles/Profile.css';
import '../styles/Search.css';

const Search = () => {
    const [searchDataUser, setSearchDataUser] = useState([]);
    const [searchDataTweet, setSearchDataTweet] = useState([]);
    const location = useLocation();
    const locationAux = location.search.slice(3) || location.hash.replace("#", "%23");
    const [newLocation, setNewLocation] = useState(locationAux);
    
    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    const [userLogueado, setUserLogueado] = useState({
        id: "",
        name: "",
        image: "",
    })

    useEffect(() => {
        Api.getUser().then(resp => {
            setUserLogueado(({
                id: resp.data.id,
                name: resp.data.name,
                image: resp.data.image,
            }))
        })
        setNewLocation(locationAux)
        Api.getSearch(newLocation)
            .then(success => {
                if (newLocation[0] === "%") {
                    setSearchDataTweet(success.data.content)
                } else {
                    setSearchDataUser(success.data.content)
                }
            }).catch(error => { console.log(error) })
    }, [locationAux, newLocation]);

    const handleMapTweet = (tweet) => {
        return (
            <div className="tweet-box-container">
                <div className="left-col">
                    <Link to={`/user/${tweet.author.id}`} className="link-tweet">
                        <img className="image-author" alt="imagen de autor" src={tweet.author.image} />
                    </Link>
                </div>
                <div className="mid-right-col">
                    <Link to={`/user/${tweet.author.id}`} className="link-tweet">
                        <p className="name-Tweet">{tweet.author.name}</p>
                        <p className="nameTweet">@{tweet.author.id}</p>
                    </Link>
                    <Link to={`/tweet/${tweet.id}`} className="link-tweet">
                        <p className="textTweet">{tweet.text}</p>
                    </Link>
                    <div className="date">
                        <p className="date-text">{tweet.date}</p>
                    </div>
                </div>
            </div>
        );
    };

    const handleMapUser = (user) => {
        return (
            <div className="user-search-content">
                <Link to={`/user/${user.id}`} className="link-tweet">
                    <div className="row search-user-container"> 
                        <div className="data-container">
                            <img className="search-user-img" alt="img de usuario" src={user.image} width="70" height="70"/>    
                            <div className="user-data-2">    
                                <p className="userName">{user.name}</p>
                                <p>@{user.id}</p>
                            </div>
                        </div>        
                        <div className="user-data">
                            <p className="search-cantSeguidores"><strong>{user.followers.length}</strong> seguidores</p>
                        </div>
                    </div>
                </Link>
            </div>
        );
    };

    return (
        <ThemeProvider theme={Themes[theme]}>
            <SearchContainer>
                <div className="search-container">
                    <NavBar theme={theme}/>
                    <div className="row sides-container">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <SidePageLeft theme={theme} setTheme={setTheme}/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 centro">
                            {newLocation[0] === "%"?
                            searchDataTweet.map(tweet => <div key={tweet.id}  >{handleMapTweet(tweet)}</div>)
                            :
                            searchDataUser.map(user => <div key={user.id} >{handleMapUser(user)}</div>)
                            }
                        </div>
                        <div className="col-lg-3 col-sm-3 col-md-3 col-xs-12">
                            <div className="data-user">
                                <div className="text-center">
                                    <img className="imagenUser" src={userLogueado.image} height="90" width="90" alt="Avatar" />
                                </div>
                                <div className="userName text-center">
                                    <p>{userLogueado.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SearchContainer>
        </ThemeProvider>
    );
};

export default Search;