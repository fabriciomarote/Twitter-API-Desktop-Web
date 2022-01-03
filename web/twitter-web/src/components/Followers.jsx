import React from 'react';
import { Link } from "react-router-dom";
import { FollowersContainer } from '../theme/Changes';
import '../styles/Followers.css'

const Followers = ({id, name, imageF}) => {

    return (
        <FollowersContainer>
        <div className="followers-content" key={`follower-${id}`}>
            <div className="right-col">
                <Link to={`/user/${id}`} style={{ textDecoration: 'none' }}>
                    <img className="imagen-userName" src={imageF} alt="imagen de follower" />
                    <p className="user-follower">{name}</p>
                </Link>
            </div>
        </div>
        </FollowersContainer>
    );
};

export default Followers;
