import styled from 'styled-components';

export const HomeContainer = styled.div`
    background-color: ${({ theme }) => theme.bgc};

    .userName {
        color: ${({ theme }) => theme.text};
    }

    .imagenUser {
        border-color: rgb(0, 233, 233)
    }

    .centro {
        border-color: ${({ theme }) => theme.centerBorderColor};
    }
`;

export const NavBarContainer = styled.div `
    .me-2 {
        background-color: ${({ theme }) => theme.profileBGC};
        color: ${({ theme }) => theme.text};
    }
`;

export const ProfileContainer = styled.div`
    background-color: ${({ theme }) => theme.bgc};

    .modal-body,
    .modal-header {
        background-color: ${({ theme }) => theme.bgc};
    }

    h5 {
        color: ${({ theme }) => theme.text};
    }

    .centro {
        border-color: ${({ theme }) => theme.centerBorderColor};
    }

    .user-data-content,
    .data-content,
    .form-control {
        background-color: ${({ theme }) => theme.profileBGC};
    }

    .cantSeguidores, 
    .userName, 
    .userId,
    .col-form-label,
    .btn-close,
    .form-control {
        color: ${({ theme }) => theme.text};
    }

    .user-img  {
        border-color: rgb(0, 233, 233)
    }
`;

export const FollowersContainer = styled.div`
    .imagen-userName {
        background-color: white;
        border-color: rgb(0, 233, 233)
    }

    .user-follower {
        color: ${({ theme }) => theme.text};
    }
`;

export const TweetContainer = styled.div`
    background-color: ${({ theme }) => theme.bgc};

    .delete-btn, 
    .button-icon,
    .icon-like {
        background-color: ${({ theme }) => theme.bgc}; 
    }

    .name-id-content,
    .form-control {
        color: ${({ theme }) => theme.text};
    }

    .tweet-content:hover .iconsDelete,
    .tweet-content:hover .delete-btn,
    .tweet-content:hover .tweet-data,
    .tweet-content:hover .data-author,
    .tweet-content:hover .name-author-tweet,
    .tweet-content:hover .textTweet,
    .tweet-content:hover .images-content,
    .tweet-content:hover .image-tweet,
    .tweet-content:hover .date-Tweet,
    .tweet-content:hover .dateTweet,
    .tweet-content:hover .cantComment-Like-Tweet,
    .tweet-content:hover .buttons-content,
    .tweet-content:hover .icon-coments,
    .tweet-content:hover .icon-like,
    .tweet-content:hover .button-icon,
    .tweet-content:hover .button-icon,
    .form-control {
        background-color: ${({ theme }) => theme.profileBGC};
    }

    .centro, 
    .comments-content, 
    .tweet-box {
        border-color: ${({ theme }) => theme.centerBorderColor};
    }

    .image-author {
        background-color: white;
        border-color: rgb(0, 233, 233)
    }

    .name-author-tweet,
    .textTweet, 
    .dateTweet, 
    .cantCommentAndLikeTweet,
    .authorName, 
    .authorName, 
    .textComment,
    .likes-container, 
    .user-name-like, h6 {
        color: ${({ theme }) => theme.text};
    }

    .tweet-box,
    .comments-buttons,
    .icon-comments,
    .icon-like,
    .comments-comment-btn,
    .comments-like-btn {
        background-color: ${({ theme }) => theme.profileBGC};
    }
`;

export const SearchContainer = styled.div`
    background-color: ${({ theme }) => theme.bgc};

    .text-center, .userName, p {
        color: ${({ theme }) => theme.text};
    }

    .user-search-content: hover,
    .tweet-box-container: hover {
        background-color: ${({ theme }) => theme.profileBGC};
    }

    .centro, .user-search-content,
    .tweet-box-container {
        border-color: ${({ theme }) => theme.centerBorderColor};
    }
`;

export const MainPageContainer = styled.div`
    background-color: ${({ theme }) => theme.profileBGC};

    .box-content, 
    .logo,
    .logoTwitter,
    .text-container,
    .logo,
    .text-container h1,
    .text-container h3,
    .button-container,
    .btn-button {
        background-color: ${({ theme }) => theme.bgc};
    }

    .text-content {
        color: ${({ theme }) => theme.text};
    }

    .box-content {
        -webkit-box-shadow: 0 30px 60px 0 ${({ theme }) => theme.shadowBox};
        box-shadow: 0 20px 60px 0 ${({ theme }) => theme.shadowBox};
    }
`;

export const LoginContainer = styled.div`
    background-color: ${({ theme }) => theme.profileBGC};

    .login-box-content,
    .logoTwitter,
    .login-text-container,
    .logo,
    .login-form-container,
    .text-container h1,
    .text-container h3,
    .button-container,
    .login-btn-button,
    .login-form-group{
        background-color: ${({ theme }) => theme.bgc};
    }

    .login-box-content {
        -webkit-box-shadow: 0 30px 60px 0 ${({ theme }) => theme.shadowBox};
        box-shadow: 0 20px 60px 0 ${({ theme }) => theme.shadowBox};
    }

    h1, h6 {
        color: ${({ theme }) => theme.text};
    }
`;

export const RegisterContainer = styled.div`
    background-color: ${({ theme }) => theme.profileBGC};

    .register-box-content {
        background-color: ${({ theme }) => theme.bgc};
        -webkit-box-shadow: 0 30px 60px 0 ${({ theme }) => theme.shadowBox};
        box-shadow: 0 20px 60px 0 ${({ theme }) => theme.shadowBox};
    }

    h4, h6 {
        color: ${({ theme }) => theme.text};
    }
`;

export const TweetModelContainer = styled.div`
    .tweetContent:hover,    
    .tweetContent:hover .mid-right,
    .tweetContent:hover .nameTweet,
    .tweetContent:hover .textTweet,
    .tweetContent:hover .image-tweet,
    .tweetContent:hover .date,
    .tweetContent:hover .date-text,
    .tweetContent:hover .comment-btn,
    .tweetContent:hover #iconsComments,
    .tweetContent:hover .like-btn,
    .tweetContent:hover .date-text,
    .tweetContent:hover .comment-btn,
    .tweetContent:hover .link-tweet,
    .tweetContent:hover .images-tweet-container {
        background-color: ${({ theme }) => theme.profileBGC};
    }

    .name-tweet, .id-tweet, .textTweet, .dateTweet, .button-icon  {
        color: ${({ theme }) => theme.text};
    }

    .button-icon {
        background-color: ${({ theme }) => theme.bgc};
    }

    .image-author-tweet {
        background-color: white;
        border-color: rgb(0, 233, 233)
    }

    .tweetContent {
        border-color: ${({ theme }) => theme.centerBorderColor};
    }
`;

export const AddTweetContainer = styled.div`
    background-color: ${({ theme }) => theme.bgc};

    .add-tweet-content {
        background-color: ${({ theme }) => theme.profileBGC};
    }

    .add-images {
        color: ${({ theme }) => theme.text};
    }

    .form-control,
    .form-control-inline {
        background-color: ${({ theme }) => theme.profileBGC};
        color: ${({ theme }) => theme.text};
    }

    .centro {
        border-color: ${({ theme }) => theme.centerBorderColor};
    }

    input::placeholder {
        color: ${({ theme }) => theme.placeHolder};
    }
`;