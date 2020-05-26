import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import { dateCount } from '../helpers/date';

import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';

const Comment = (props) => {
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);

	const [editing, setEditing] = useState(false);
	const [text, setText] = useState(props.comment.text);
	const [deleted, setDeleted] = useState();

	const url = `/${props.comment.author.username}`;

	function changeText(e) {
		setText(e.target.value);
	}

	function toggleEdit(e) {
		setEditing(!editing);
	}

	async function handleEdit(e) {
		e.preventDefault();
		const body = {
			text,
			id: props.comment._id
		};
		console.log(body);
		const response = await Axios.post('/comments/edit', body);
		const { msg } = response.data;
		appDispatch({ type: 'flashMessage', value: msg });
		setEditing(!editing);
	}

	async function handleDelete(e) {
		const body = {
			id: props.comment._id,
			journal_id: props.journal_id
		};
		const response = await Axios.post('/comments/delete', body);
		const { msg } = response.data;
		location.reload();
	}

	return (
		<div class='comment'>
			{/* <a class='avatar'>
				<img src='/images/avatar/small/matt.jpg' />
			</a> */}
			<div class='content edit'>
				<Link to={url} class='author'>
					{props.comment.author.username}
				</Link>
				<div class='metadata'>
					<span class='date'>
						{dateCount(props.comment.writtenAt)}
					</span>
				</div>

				{!editing ? (
					<div class='text'>{text}</div>
				) : (
					<form onSubmit={handleEdit} className='ui form'>
						<input
							className='field edit-comment'
							type='text'
							name='editComment'
							id='editComment'
							onChange={changeText}
							defaultValue={text}
						/>
						<button
							type='submit'
							className='ui mini button edit-comment_button'
						>
							Edit
						</button>
						<button
							type='submit'
							className='ui mini button edit-comment_button'
							onClick={toggleEdit}
						>
							Cancel
						</button>
					</form>
				)}

				{props.comment.author.id === appState.user.id && !editing && (
					<div class='actions'>
						<a class='reply' onClick={toggleEdit}>
							Edit
						</a>

						<a class='reply' onClick={handleDelete}>
							Delete
						</a>
					</div>
				)}
			</div>
		</div>
	);
};

export default Comment;
