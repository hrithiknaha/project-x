import React, { useContext, useState } from 'react';
import Axios from 'axios';

import DispatchContext from '../DispatchContext';

const LogInForm = () => {
	const appDispatch = useContext(DispatchContext);

	const [username, setUsername] = useState();

	const [password, setPassword] = useState();

	function handleUsername(e) {
		setUsername(e.target.value);
	}

	function handlePassword(e) {
		setPassword(e.target.value);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const body = {
			username,
			password
		};

		try {
			const response = await Axios.post('/login', body);
			const { err } = response.data;
			if (err) {
				return appDispatch({
					type: 'flashMessage',
					value: err
				});
			}
			console.log(response.data);
			appDispatch({ type: 'login', user: response.data });
		} catch (e) {
			console.log('Something wrong happened' + e);
		}
	}
	return (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label htmlFor='username-register' className='text-muted mb-1'>
					<small>Username</small>
				</label>
				<input
					id='username-register'
					name='username'
					className='form-control'
					type='text'
					placeholder='Enter Username'
					autoComplete='off'
					onChange={handleUsername}
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
					placeholder='Enter Password'
					onChange={handlePassword}
				/>
			</div>
			<button
				type='submit'
				className='py-3 mt-4 btn btn-lg btn-success btn-block'
			>
				Log in to F-O-W
			</button>
		</form>
	);
};

export default LogInForm;
