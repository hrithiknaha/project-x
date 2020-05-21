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
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label htmlFor='name-register' className='text-muted mb-1'>
					<small>Name</small>
				</label>
				<input
					id='name-register'
					name='name'
					className='form-control'
					type='text'
					placeholder='Enter your Name'
					autoComplete='off'
					onChange={handleName}
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='username-register' className='text-muted mb-1'>
					<small>Username</small>
				</label>
				<input
					id='username-register'
					name='username'
					className='form-control'
					type='text'
					placeholder='Pick a username'
					autoComplete='off'
					onChange={handleUsername}
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='email-register' className='text-muted mb-1'>
					<small>Email</small>
				</label>
				<input
					id='email-register'
					name='email'
					className='form-control'
					type='text'
					placeholder='you@example.com'
					autoComplete='off'
					onChange={handleEmail}
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='password-register' className='text-muted mb-1'>
					<small>Password</small>
				</label>
				<input
					id='password-register'
					name='password'
					className='form-control'
					type='password'
					placeholder='Create a password'
					onChange={handlePassword}
				/>
			</div>
			<button
				type='submit'
				className='py-3 mt-4 btn btn-lg btn-success btn-block'
			>
				Sign up for F-O-W
			</button>
		</form>
	);
};

export default SignUpForm;
