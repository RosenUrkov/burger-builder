import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://burger-builder-563fe.firebaseio.com/'
});

export default instance;
