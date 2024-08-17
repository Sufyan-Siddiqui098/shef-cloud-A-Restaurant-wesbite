import axios from "axios";
const baseURL = process.env.REACT_APP_baseURL || "http://shef-admin.test";

const api = axios.create({baseURL});


export {api};