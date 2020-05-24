import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';

import Comment from './Comment';

const JournalExpanded = (props) => {
	const url = `/${props.location.state.journal.author.username}`;

	const [isLoading, setisLoading] = useState(true);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await Axios.get(
					'/journals/' + props.location.state.journal._id
				);
				setComments(response.data);
				setisLoading(false);
			} catch (e) {
				console.log('There was a problem' + e);
			}
		}

		fetchData();
	}, []);

	return (
		<div className='ui container mt-s'>
			<button className='ui button' onClick={props.history.goBack}>
				Back
			</button>
			<div className='mt-s mb-s je'>
				<div class='ui segment je-segment'>
					<h1 className='je-segment_title'>
						{props.location.state.journal.title}
					</h1>
					<p className='je-segment_body'>
						{props.location.state.journal.body}
					</p>

					<p>
						By{' '}
						<Link to={url}>
							{props.location.state.journal.author.username}
						</Link>
					</p>
				</div>
			</div>
			<div class='ui comments'>
				<h3 class='ui dividing header'>Comments</h3>
				{!isLoading && (
					<div>
						{comments.map((comment) => {
							return (
								<Comment comment={comment} key={comment._id} />
							);
						})}
						<form class='ui reply form mt-s'>
							<div class='field' data-children-count='1'>
								<textarea
									rows='2'
									className='je-comments-text'
								></textarea>
							</div>
							<div class='ui blue labeled submit icon button'>
								<i class='icon edit'></i> Add Reply
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default withRouter(JournalExpanded);
