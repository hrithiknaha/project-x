import React, { useState } from 'react';
import Axios from 'axios';

const WriteComment = (props) => {
	const [text, setText] = useState();

	function changeComment(e) {
		setText(e.target.value);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const body = {
			journal: props.journal,
			text
		};

		const response = await Axios.post('/comments/write', body);
		location.reload();
	}

	return (
		<form onSubmit={handleSubmit} className='ui reply form mt-s'>
			<div className='field' data-children-count='1'>
				<textarea
					rows='2'
					className='je-comments-text'
					onChange={changeComment}
				></textarea>
			</div>
			<button className='ui blue labeled submit icon button'>
				<i className='icon edit'></i> Add Reply
			</button>
		</form>
	);
};

export default WriteComment;
