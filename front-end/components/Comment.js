import React from 'react';
import { Link } from 'react-router-dom';

import { dateCount } from '../helpers/date';

const Comment = (props) => {
	const url = `/${props.comment.author.username}`;
	return (
		<div class='comment'>
			{/* <a class='avatar'>
				<img src='/images/avatar/small/matt.jpg' />
			</a> */}
			<div class='content'>
				<Link to={url} class='author'>
					{props.comment.author.username}
				</Link>
				<div class='metadata'>
					<span class='date'>
						{dateCount(props.comment.writtenAt)}
					</span>
				</div>
				<div class='text'>{props.comment.text}</div>
			</div>
		</div>
	);
};

export default Comment;
