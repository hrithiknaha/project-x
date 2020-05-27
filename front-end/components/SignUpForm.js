import React, { useContext, useState } from 'react';
import Axios from 'axios';

import DispatchContext from '../DispatchContext';

const SignUpForm = () => {
	const appDispatch = useContext(DispatchContext);

	const [name, setName] = useState();
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	function handleName(e) {
		setName(e.target.value);
	}

	function handleUsername(e) {
		setUsername(e.target.value);
	}

	function handlePassword(e) {
		setPassword(e.target.value);
	}

	function handleEmail(e) {
		setEmail(e.target.value);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const body = {
			name,
			username,
			email,
			password
		};

		try {
			const response = await Axios.post('/register', body);
			const { err } = response.data;
			if (err) {
				return appDispatch({
					type: 'flashMessage',
					value: err
				});
			}
			localStorage.setItem('fowUsername', username);
			appDispatch({ type: 'login', user: response.data });
		} catch (e) {
			console.log('Something wrong happened' + e);
		}
	}

	return (
		<form onSubmit={handleSubmit} className='ui form'>
			<div className='field'>
				<label>Name</label>
				<input
					name='name'
					type='text'
					placeholder='Enter your Name'
					autoComplete='off'
					onChange={handleName}
				/>
			</div>
			<div className='field'>
				<label>Username</label>
				<input
					name='username'
					type='text'
					placeholder='Pick a username'
					autoComplete='off'
					onChange={handleUsername}
				/>
			</div>
			<div className='field'>
				<label>Email</label>
				<input
					name='email'
					type='text'
					placeholder='you@example.com'
					autoComplete='off'
					onChange={handleEmail}
				/>
			</div>
			<div className='field'>
				<label>Password</label>
				<input
					name='password'
					type='password'
					placeholder='Create a password'
					onChange={handlePassword}
				/>
			</div>
			<button type='submit' className='ui green button form-button'>
				Sign up for F-O-W
			</button>
		</form>
	);
};

export default SignUpForm;
