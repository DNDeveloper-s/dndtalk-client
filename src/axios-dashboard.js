import axios from 'axios';

const token = window.localStorage.getItem('bearer');

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URI + '/dashboard',
    headers: {
        'Authorization': 'Bearer ' + token
    }
})

export default instance;