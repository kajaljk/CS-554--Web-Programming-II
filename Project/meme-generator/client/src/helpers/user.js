import axios from 'axios';
import {apiUrl} from '../config';


export const createUser = async(user) => {
	const url = `${apiUrl}/register`;
    return axios.post(url, user);
}


export const login = (email = null, password = null) => {
	const url = `${apiUrl}/authenticate`;
    return axios.post(url, {
    	email: email,
    	password: password
    });
}