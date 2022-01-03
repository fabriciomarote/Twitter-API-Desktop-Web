import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from "react-router-dom";
import NavBar from './NavBar';
import SidePageLeft from "./SidePageLeft";
import Api from "../api/api";
import Themes from '../theme/Themes'
import { ThemeProvider } from 'styled-components';
import { TweetContainer } from '../theme/Changes';
import '../styles/Tweet.css';

const Tweet = () => {
    const { id } = useParams();
    const [tweet, setTweet] = useState({
        text: "",
        images: [],
        reply: "",
        author: "",
        date: "",
        comments: [],
        likes: [],
    });

    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    const [data, setData] = useState({
        text: "",
        images: []
    });

    const history = useHistory();

    const [user, setUser] = useState({
        id: "",
        name: "",
        image: "",
        followers: [],
    });

    const [deleteError, setDeleteError] = useState(false)

    const addLike = (id) => {
        Api.putLike(id)
        Api.getTweetById(id)
            .then(response =>
                setTweet((prevState) => ({
                    ...prevState,
                    likes: response.data.likes,
                }))
            )
    };

    const handleChange = name => event => {
        setData(prevState => ({ ...prevState, [name]: event.target.value }));
    }

    const addComment = (event) => {
        event.preventDefault();
        Api.postComment(id, data)
            .then(
                setData(prevState => ({ ...prevState }))
            )
            .catch(error => {
                console.log(error)
            });
    }

    const deleteTweet = (id) => {
        Api.deleteTweet(id)
            .then(_ => {
                comprobarSiBorrar(user.id, tweet.author.id);
            }).catch(error => {
                console.log(error);
            });
    }

    function comprobarSiBorrar(userId, authorId) {
        if (userId === authorId) {
            history.push("/profile");
        } else {
            setDeleteError(true);
        }
    }

    useEffect(() => {
        Api.getTweetById(id)
            .then(response => {
                setTweet({
                    text: response.data.text,
                    images: response.data.images,
                    reply: response.data.reply,
                    author: response.data.author,
                    comments: response.data.comment,
                    date: response.data.date,
                    likes: response.data.likes,
                })
            }).catch(error => {
                console.log(error)
            });
    },  [id, data, tweet]
    );

    useEffect(() => {
        Api.getUser()
            .then(response => {
                setUser(
                    response.data)
            }).catch(error => {
                console.log(error)
            });
    }, []
    );

    const iconColor = (theme === 'light') ? 'ccurrentColor' : 'white';

    return (
        <ThemeProvider theme={Themes[theme]}>
            <TweetContainer>
                <div className="tweet-container">
                    <NavBar theme={theme}/>
                    <div className="row sides-container">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <SidePageLeft theme={theme} setTheme={setTheme}/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 centro">
                            {deleteError && (
                                <div className="alert alert-danger" role="alert">
                                    El tweet no puede eliminarse si no sos el autor.
                                </div>)
                            }
                            <div className="tweet-content">
                                <div className="iconsDelete">
                                    <button type="submit" className="delete-btn"
                                        onClick={(event) => { event.preventDefault(); deleteTweet(id) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={iconColor} className="bi bi-x-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </button>
                                </div>    
                                <div className="tweet-data">
                                    <div className="data-author">
                                        <Link to={`/user/${tweet.author.id}`} style={{ textDecoration: 'none' }}>
                                            <img className="image-author" alt="imagen de autor" src={tweet.author.image} width="70" height="70"/>
                                        </Link>
                                        <div className="name-id-content">
                                            <Link to={`/user/${tweet.author.id}`} style={{ textDecoration: 'none', color: 'rgb(98, 98, 98)' }}>
                                                <p className="name-author-tweet"><strong>{tweet.author.name}</strong>      @{tweet.author.id} </p>
                                            </Link>
                                        </div>
                                    </div>    
                                    <p className="textTweet">{tweet.text}</p>
                                </div>
                                <div className="images-content">
                                    {tweet.images.map((image, index) => (
                                        <img key={index} className="image-tweet" src={image} alt="imagen de tweet"/>
                                    ))}
                                </div>    
                                <div className="date-Tweet">
                                    <p className="dateTweet">{tweet.date}</p>
                                    <div className="cantComment-Like-Tweet">
                                        <p className="cantCommentAndLikeTweet"><strong>{tweet.comments.length}</strong>    Comentarios              <strong>{tweet.likes.length}</strong>         Me gusta </p>
                                    </div>
                                </div>   
                                <div className="buttons-content">
                                    <div className="icon-comments">
                                        <button type="submit" className="button-icon comment-btn" id="iconsComments">
                                            {tweet.comments.find(u => u.author.name === user.name)
                                            ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="Deepskyblue" className="bi bi-chat-fill" viewBox="0 0 16 16">
                                                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={iconColor} className="bi bi-chat" viewBox="0 0 16 16">
                                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                            </svg>}
                                        </button>
                                    </div>
                                    <div className="icon-like">    
                                        <button type="submit" className="button-icon like-btn"
                                            onClick={(event) => { event.preventDefault(); addLike(id) }}>{tweet.likes.find(u => u.name === user.name)
                                            ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="Red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={iconColor} className="bi bi-heart" viewBox="0 0 16 16">
                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                            </svg>}
                                        </button>
                                    </div>
                                </div>     
                                <div className="button-comments">
                                    <div className="row">
                                        <form onSubmit={addComment} className="form-inline">
                                            <div className="comment-box">
                                                <input type="text" className="form-control" name="text" value={data.text} onChange={handleChange("text")} placeholder="¿Qué está pasando?" required />
                                            </div>
                                            <div className="button-comment">
                                                <button type="submit" className="btn-btn btn-info" data-bs-dismiss="modal"> Comentar</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>    
                            </div>
                            <div className="comments-content">
                                {tweet.comments.map((comment, index) =>
                                    <div className="tweet-box" key={index}>
                                        <div className="data-comment">
                                            <Link to={`/user/${comment.author.id}`} style={{ textDecoration: 'none' }}>
                                                <img className="image-author" src={comment.author.image} alt="imagen de author" />
                                            </Link>
                                            <p className="authorName" ><strong>{comment.author.name}</strong>    @{comment.author.id}</p>
                                        </div>
                                        <Link to={`/tweet/${comment.id}`} className="link-tweet">
                                            <div className="tex-comment-content">
                                                <p className="textComment">{comment.text}</p>        
                                            </div>
                                        </Link>    
                                        <div className="comment-images">
                                            {comment.images.map((image, index) => (
                                                <img key={index} className="image-tweet" src={image} alt="imagen de tweet"/>
                                            ))}
                                        </div>
                                        <div className="comments-buttons">
                                            <div className="comments-comment">                              
                                                <button type="submit" className="button-icon comments-comment-btn">
                                                    {comment.comment.find(u => u.author.name === user.name)
                                                    ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="Deepskyblue" className="bi bi-chat-fill" viewBox="0 0 16 16">
                                                        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                                                    </svg>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={iconColor} className="bi bi-chat" viewBox="0 0 16 16">
                                                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                                    </svg>}
                                                </button> <h6 className="h6-comments">{comment.comment.length}</h6>
                                            </div>    
                                            <div className="comments-like">      
                                                <button type="submit" className="button-icon comments-like-btn" 
                                                    onClick={(event) => { event.preventDefault(); addLike(comment.id)}}>{comment.likes.find(u => u.name === user.name)
                                                    ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="Red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                                    </svg>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={iconColor} className="bi bi-heart" viewBox="0 0 16 16">
                                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                    </svg>}    
                                                </button> <h6 className="h6-likes">{comment.likes.length}</h6>         
                                            </div>  
                                        </div>      
                                    </div>    
                                )}
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <div className="likes-container">
                                <h5 className="likes-text">Me Gustas</h5>
                                {tweet.likes.map(like =>
                                    <div className="likes-content" key={`like-${like.id}`}>
                                        <div className="likes-data">
                                            <Link to={`/user/${like.id}`} style={{ textDecoration: 'none' }}>
                                                <img className="imagen-userName" src={like.image} alt="imagen de userLike" width="60" height="60"></img>
                                                <p className="user-name-like"><strong>{like.name}</strong></p>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </TweetContainer>
        </ThemeProvider>
    );
};

export default Tweet;
