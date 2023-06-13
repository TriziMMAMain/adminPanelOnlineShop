import axios from 'axios';

const interceptors = axios.create({
    baseURL: 'https://backend-online-shop-mongodb.onrender.com/',
});

export default interceptors;