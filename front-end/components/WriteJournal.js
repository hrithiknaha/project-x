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
			props.history.push(`/journal/${id}`);
		} catch (e) {
			console.log('Something went wrong' + e);
		}
	}

	return (
		<div className='container container--narrow py-md-5 home'>
			<h1 className='display-4 text-center'>
				Write down your magic spell
			</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='exampleFormControlInput1'>Title</label>
					<input
						type='text'
						className='form-control'
						id='exampleFormControlInput1'
						placeholder='Make it a good one!'
						onChange={changeTitle}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='exampleFormControlTextarea1'>
						Prologue
					</label>
					<textarea
						className='form-control'
						id='exampleFormControlTextarea1'
						rows='3'
						placeholder='This will be displayed on the cards!'
						onChange={changePrologue}
					></textarea>
				</div>
				<div className='form-group'>
					<label htmlFor='exampleFormControlTextarea1'>Content</label>
					<textarea
						className='form-control'
						id='exampleFormControlTextarea1'
						rows='5'
						placeholder='Your story goes here'
						onChange={changeContent}
					></textarea>
				</div>
				<div className='form-group'>
					<label htmlFor='exampleFormControlSelect1'>Genre</label>
					<select
						className='form-control'
						id='exampleFormControlSelect1'
						onChange={changeGenre}
					>
						<option selected>Select Genre</option>
						<option value='blog'>Blog</option>
						<option value='entry'>Entry</option>
						<option value='poetry'>Poetry</option>
						<option value='thoughts'>Thoughts</option>
						<option value='journal'>Journal</option>
						<option value='quote'>Quote</option>
					</select>
				</div>
				<button type='submit' className='btn btn-primary'>
					Post
				</button>
			</form>
		</div>
	);
};

export default withRouter(WriteJournal);
