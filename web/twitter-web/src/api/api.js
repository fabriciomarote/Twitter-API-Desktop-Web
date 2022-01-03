import axios from 'axios';

var Api = {
    getUser: function() { return axios.get('http://localhost:7000/user')},
    getUserById: function(id) { return axios.get(`http://localhost:7000/user/${id}`)},
    getTweetById: function(id) { return axios.get(`http://localhost:7000/tweet/${id}`)},
    postEditProfile: function(data) { return axios.post('http://localhost:7000/user', data)},
    postLogin: function(data) { return axios.post('http://localhost:7000/login', data)},
    deleteTweet: function(id) { return axios.delete(`http://localhost:7000/tweet/${id}`)},
    postRegister: function(data) { return axios.post('http://localhost:7000/register', data)},
    putLike: function(id) { return axios.put(`http://localhost:7000/tweet/${id}/like`)},
    postComment: function(id, data) { return axios.post(`http://localhost:7000/tweet/${id}/comment`, data)},
    putByFollow: function(id) {return axios.put(`http://localhost:7000/user/${id}/follow`)},
    addTweet: function(data) {return axios.post('http://localhost:7000/tweet', data)},
    getSearch: function(data) {return axios.get(`http://localhost:7000/search?q=${data}`)},
};

export default Api;