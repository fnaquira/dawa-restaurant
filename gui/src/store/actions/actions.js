import axios from '../../utils/axios';

import * as actionTypes from './actionTypes';
import * as URLS from '../../utils/urls';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (token, email, name, rol) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		email: email,
		name: name,
		rol: rol
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('email');
	localStorage.removeItem('name');
	localStorage.removeItem('rol');
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const register = (name, email, password) => {
	return dispatch => {
		dispatch(authStart());
		axios({
			...URLS.AUTH_REGISTER,
			data: {
				name: name,
				email: email,
				password: password
			}
		})
			.then(response => {
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('name', response.data.name);
				localStorage.setItem('email', email);
				localStorage.setItem('rol', response.data.rol);
				dispatch(
					authSuccess(
						response.data.token,
						email,
						response.data.name,
						response.data.rol
					)
				);
			})
			.catch(err => {
				dispatch(authFail(err.response.data));
			});
	};
};

export const auth = (email, password) => {
	return dispatch => {
		dispatch(authStart());
		axios({
			...URLS.AUTH_LOGIN,
			data: {
				email: email,
				password: password
			}
		})
			.then(response => {
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('name', response.data.name);
				localStorage.setItem('email', email);
				localStorage.setItem('rol', response.data.rol);
				dispatch(
					authSuccess(
						response.data.token,
						email,
						response.data.name,
						response.data.rol
					)
				);
			})
			.catch(err => {
				dispatch(authFail(err.response.data));
			});
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const email = localStorage.getItem('email');
			const name = localStorage.getItem('name');
			const rol = localStorage.getItem('rol');
			dispatch(authSuccess(token, email, name, rol));
		}
	};
};
