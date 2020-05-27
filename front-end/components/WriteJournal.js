import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';

const WriteJournal = (props) => {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);

	const [title, setTitle] = useState();
	const [prologue, setPrologue] = useState();
	const [content, setContent] = useState();
	const [genre, setGenre] = useState();

	function changeTitle(e) {
		setTitle(e.target.value);
	}

	function changePrologue(e) {
		setPrologue(e.target.value);
	}

	function changeContent(e) {
		setContent(e.target.value);
	}

	function changeGenre(e) {
		setGenre(e.target.value);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const body = {
			title,
			prologue,
			content,
			genre
		};

		try {
			const response = await Axios.post('/journals/write', body);
			const { msg, id } = response.data;
			appDispatch({ type: 'flashMessage', value: msg });
			// props.history.push(`/journal/${id}`);
			props.history.push(`/`);
		} catch (e) {
			console.log('Something went wrong' + e);
		}
	}

	return (
		<div className='mt-s ui container wj'>
			<h1 className='wj-title mb-s'>Write Your Journal Here!</h1>
			<form onSubmit={handleSubmit} className='ui form'>
				<div className='field'>
					<label>Title</label>
					<input
						type='text'
						placeholder='Make it a good one!'
						onChange={changeTitle}
					/>
				</div>
				<div className='field'>
					<label>Prologue</label>
					<textarea
						rows='3'
						placeholder='This will be displayed on the cards!'
						onChange={changePrologue}
					></textarea>
				</div>
				<div className='field'>
					<label>Content</label>
					<textarea
						rows='5'
						placeholder='Your story goes here'
						onChange={changeContent}
					></textarea>
				</div>
				<div className='field'>
					<label>Genre</label>
					<select onChange={changeGenre}>
						<option selected>Select Genre</option>
						<option value='blog'>Blog</option>
						<option value='entry'>Entry</option>
						<option value='poetry'>Poetry</option>
						<option value='thoughts'>Thoughts</option>
						<option value='journal'>Journal</option>
						<option value='quote'>Quote</option>
					</select>
				</div>
				<button type='submit' className='ui button positive'>
					Post
				</button>
			</form>
		</div>
	);
};

export default withRouter(WriteJournal);
