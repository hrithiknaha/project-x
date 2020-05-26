import React, { useState, useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';

import Comment from './Comment';

import DispatchContext from '../DispatchContext';

const JournalExpanded = (props) => {
	const appDispatch = useContext(DispatchContext);

	const url = `/${props.location.state.journal.author.username}`;

	const [isLoading, setisLoading] = useState(true);
	const [comments, setComments] = useState([]);
	const [journal, setJournal] = useState({});

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await Axios.get(
					'/journals/' + props.location.state.journal._id
				);
				setComments(response.data);
				setisLoading(false);
				setJournal(props.location.state.journal);
			} catch (e) {
				console.log('There was a problem' + e);
			}
		}

		fetchData();
	}, []);

	async function handleDelete(e) {
		try {
			const response = await Axios.post(
				'/journals/' + props.location.state.journal._id + '/delete'
			);
			const { msg } = response.data;
			if (msg) {
				appDispatch({ type: 'flashMessage', value: msg });
				props.history.push('/');
			}
		} catch (e) {
			console.log('Error while deleting' + e);
		}
	}

	return (
		<div className='ui container mt-s'>
			<button className='ui button' onClick={props.history.goBack}>
				Back
			</button>
			<div className='mt-s mb-s je'>
				<div className='ui segment je-segment'>
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

					<Link
						to={{
							pathname: `/journal/edit`,
							state: {
								content: journal
							}
						}}
					>
						<button className='ui secondary button'>Edit</button>
					</Link>

					<button className='ui button' onClick={handleDelete}>
						Delete
					</button>
				</div>
			</div>
			<div className='ui comments'>
				<h3 className='ui dividing header'>Comments</h3>
				{!isLoading && (
					<div>
						{comments.map((comment) => {
							return (
								<Comment comment={comment} key={comment._id} />
							);
						})}
						<form className='ui reply form mt-s'>
							<div className='field' data-children-count='1'>
								<textarea
									rows='2'
									className='je-comments-text'
								></textarea>
							</div>
							<div className='ui blue labeled submit icon button'>
								<i className='icon edit'></i> Add Reply
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default withRouter(JournalExpanded);
