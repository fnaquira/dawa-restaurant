import AsyncStorage from '@react-native-community/async-storage';

import axios from '../../lib/axios';

import * as actionTypes from './actionTypes';
import * as URLS from '../../lib/urls';

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
			.then(async response => {
				await AsyncStorage.setItem('token', response.data.token);
				await AsyncStorage.setItem('name', response.data.name);
				await AsyncStorage.setItem('email', email);
				await AsyncStorage.setItem('rol', response.data.rol);
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

export const auth = (email, password, cb) => {
	return dispatch => {
		dispatch(authStart());
		axios({
			...URLS.AUTH_LOGIN,
			data: {
				email: email,
				password: password
			}
		})
			.then(async response => {
				await AsyncStorage.setItem('token', response.data.token);
				await AsyncStorage.setItem('name', response.data.name);
				await AsyncStorage.setItem('email', email);
				await AsyncStorage.setItem('rol', response.data.rol);
				dispatch(
					authSuccess(
						response.data.token,
						email,
						response.data.name,
						response.data.rol
					)
				);
				cb();
			})
			.catch(err => {
				dispatch(authFail(err.response.data));
			});
	};
};

export const authCheckState = () => {
	return async dispatch => {
		const token = await AsyncStorage.getItem('token');
		if (!token) {
			await AsyncStorage.clear();
			dispatch(logout());
		} else {
			const email = await AsyncStorage.getItem('email');
			const name = await AsyncStorage.getItem('name');
			const rol = await AsyncStorage.getItem('rol');
			dispatch(authSuccess(token, email, name, rol));
		}
	};
};
