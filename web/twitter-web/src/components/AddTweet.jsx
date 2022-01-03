import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Api from "../api/api";
import NavBar from "./NavBar";
import SidePageLeft from "./SidePageLeft";
import Themes from '../theme/Themes'
import { ThemeProvider } from 'styled-components';
import { AddTweetContainer } from '../theme/Changes';
import '../styles/AddTweet.css';

const AddTweet = () => {

    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    const [imgs, setImgs] = useState({
        imagen1: "",
        imagen2: "",
        imagen3: "",
        imagen4: ""
    });

    const [data, setData] = useState({
        text: "",
        images: []
    });

    const history = useHistory();

    const handleChange = name => event => {
        setData(prevState => ({ ...prevState, [name]: event.target.value }));
    }

    const addTweet = () => {
        Api.addTweet(data)
            .then( _ => {
                setData(prevState => ({ ...prevState }));
                history.push('/home');
            }).catch( error => {
                console.log(error);
            });
    };

    return (
        <ThemeProvider theme={Themes[theme]}>
            <AddTweetContainer>
                <div className="addTweet-container">
                    <NavBar theme={theme} setTheme={setTheme}/>
                    <div className="row sides-container">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <SidePageLeft theme={theme} setTheme={setTheme}/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 centro">
                            <div className="add-tweet-content">
                                <form onSubmit={addTweet} className="form-inline">
                                    <div className="add-text">
                                        <input type="text" id="text-tweet" className="form-control" name="text" value={data.text} onChange={handleChange("text")} placeholder="¿Qué está pasando?" required />
                                    </div>
                                    
                                    <div className="button-comment">
                                        <button type="submit" className="btn-btn btn-info" data-bs-dismiss="modal"> Twittear</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-3 col-md-3 col-xs-0">
                        </div>
                    </div>
                </div>
            </AddTweetContainer>
        </ThemeProvider>
    );
};

export default AddTweet; 

/*
    <div className="add-images">
        <input type="text" className="form-control-inline" name="image1" value={images.image1} onChange={handleChange("image1")} placeholder="Imagen 1" required />
        <input type="text" className="form-control-inline" name="image2" value={images.image2} onChange={handleChange("image2")} placeholder="Imagen 2" required />
        <input type="text" className="form-control-inline" name="image3" value={images.image3} onChange={handleChange("image3")} placeholder="Imagen 3" required />
        <input type="text" className="form-control-inline" name="image4" value={images.image4} onChange={handleChange("image4")} placeholder="Imagen 4" required />
    </div> 
*/ 