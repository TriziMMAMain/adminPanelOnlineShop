import axios from 'axios';

const interceptors = axios.create({
    baseURL: 'https://backend-online-shop-mongodb.onrender.com/',
    // baseURL: 'http://localhost:4000/',
});

export default interceptors;