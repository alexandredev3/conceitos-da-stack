import axios from 'axios';

// estou criando uma estancia.
const api = axios.create({
  baseURL: 'http://localhost:3333'
});

export default api;