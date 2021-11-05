import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

const AXIOS = axios.create({
    baseURL: URL,
});

export default AXIOS;
