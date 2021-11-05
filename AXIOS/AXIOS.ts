import axios, { Axios } from "axios";

const AXIOS = axios.create({
    baseURL: "http://localhost:3000/api",
});

export default AXIOS;
