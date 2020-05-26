import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

import DispatchContext from '../DispatchContext';

const EditJournal = (props) => {
	const appDispatch = useContext(DispatchContext);

	const [title, setTitle] = useState(props.location.state.content.title);
	const [prologue, setPrologue] = useState(
		props.location.state.content.prologue
	);
	const [content, setContent] = useState(props.location.state.content.body);
	const [genre, setGenre] = useState(props.location.state.content.genre);

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
		const response = await Axios.post(
			'/journals/' + props.location.state.content._id + '/edit',
			body
		);
		props.history.push('/');
		const { msg } = response.data;
		if (msg) {
			appDispatch({ type: 'flashMessage', value: msg });
			console.log(msg);
		}
	}

	return (
		<div>
			<div className='mt-s ui container wj'>
				<h1 className='wj-title mb-s'>Edit Your Journal Here!</h1>
				<form onSubmit={handleSubmit} className='ui form'>
					<div className='field'>
						<label>Title</label>
						<input
							type='text'
							placeholder='Make it a good one!'
							defaultValue={props.location.state.content.title}
							onChange={changeTitle}
						/>
					</div>
					<div className='field'>
						<label>Prologue</label>
						<textarea
							rows='3'
							placeholder='This will be displayed on the cards!'
							defaultValue={props.location.state.content.prologue}
							onChange={changePrologue}
						></textarea>
					</div>
					<div className='field'>
						<label>Content</label>
						<textarea
							rows='5'
							placeholder='Your story goes here'
							defaultValue={props.location.state.content.body}
							onChange={changeContent}
						></textarea>
					</div>
					<div className='field'>
						<label>Genre</label>
						<select
							defaultValue={props.location.state.content.genre}
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
					<button type='submit' className='ui button positive'>
						Post
					</button>
				</form>
			</div>
		</div>
	);
};

export default withRouter(EditJournal);
