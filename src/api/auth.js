import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllUsers = () => {
	return axios(`${apiUrl}/user`)
}

export const getOneUser = () => {

	return axios(`${apiUrl}/user/:id`)
}

export const signUp = (credentials) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/sign-up',
		data: {
			credentials: {
				email: credentials.email,
				password: credentials.password,
				password_confirmation: credentials.passwordConfirmation,
			},
		},
	})
}

export const signIn = (credentials) => {
	return axios({
		url: apiUrl + '/sign-in',
		method: 'POST',
		data: {
			credentials: {
				email: credentials.email,
				password: credentials.password,
			},
		},
	})
}

export const signOut = (user) => {
	return axios({
		url: apiUrl + '/sign-out',
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const changePassword = (passwords, user) => {
	return axios({
		url: apiUrl + '/change-password',
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			passwords: {
				old: passwords.oldPassword,
				new: passwords.newPassword,
			},
		},
	})
}
