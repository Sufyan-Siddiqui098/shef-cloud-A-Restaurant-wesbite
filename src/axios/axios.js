import axios from "axios";
const baseURL = process.env.REACT_APP_baseURL || "http://backend-shef.exactomark.com";

const api = axios.create({baseURL});


export {api};