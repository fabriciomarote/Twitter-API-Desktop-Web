import React, { useState, useEffect } from 'react';
import Api from "../api/api";
import NavBar from './NavBar';
import SidePageLeft from './SidePageLeft';
import Tweet from './TweetModel';
import Themes from '../theme/Themes'
import { ThemeProvider } from 'styled-components';
import { HomeContainer } from '../theme/Changes';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState({
        name: "",
        image: "",
        followers: [],
        timeline: [],
    })

    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    useEffect(() => {
        Api.getUser()
            .then(success => {
                setUser({
                    name: success.data.name,
                    image: success.data.image,
                    followers: success.data.followers,
                    timeline: success.data.timeline,
                })
            })
            .catch(error =>
                console.log(error)
            )
    }, []
    );
    
    return (
        <ThemeProvider theme={Themes[theme]}>
            <HomeContainer>    
                <div className="home-container">
                    <NavBar theme={theme}/>
                    <div className="row sides-container">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <SidePageLeft theme={theme} setTheme={setTheme}/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 centro">
                            <div className="tweets-content">
                                <div className="tweets-container">
                                    {user.timeline.map(tweet =>
                                        <Tweet key={tweet.id}
                                            id={tweet.id}
                                            text={tweet.text}
                                            images={tweet.images}
                                            reply={tweet.reply}
                                            date={tweet.date}
                                            likes={tweet.likes}
                                            author={tweet.author}
                                            comments={tweet.comment}
                                            uName={user.name}>
                                        </Tweet>)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <Link to={'/profile'} style={{ textDecoration: 'none' }}>
                                <div className="userInfo-content">
                                    <div className="imagen-user text-center">
                                        <img className="imagenUser" src={user.image} height="90" width="90" alt="Avatar" />
                                    </div>
                                    <div className="userName text-center">
                                        <p>{user.name}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </HomeContainer>
        </ThemeProvider>
    )
}

export default Home;

