import axios from 'axios';

const Axios = axios.create({
    baseUrl: "http://localhost:3333"
})

export default Axios;