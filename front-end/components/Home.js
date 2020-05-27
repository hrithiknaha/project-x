import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import HomeNoFeed from './HomeNoFeed';
import JournalFeed from './JournalFeed';
import Loading from './Loading';

import StateContext from '../StateContext';

const Home = () => {
	const appState = useContext(StateContext);

	const [isEmpty, setIsEmpty] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [journalData, setjournalData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await Axios.post('/journals');
				if (response.data.length !== 0) setIsEmpty(false);
				setjournalData(response.data);
				setIsLoading(false);
				console.log(response.data);
			} catch (e) {
				console.log('There was a problem' + e);
			}
		}

		fetchData();
	}, []);

	if (isLoading)
		return (
			<div className='ui container home'>
				<h2 className='home-body_title'>
					Hello <strong>{appState.user.username}</strong>, here is
					your feed.
				</h2>
				<div className='mt-s'>
					<Link to='/journal/write'>
						<button type='button' className='positive ui button'>
							Write you own!
						</button>
					</Link>
					<Link to={appState.user.username}>
						<button
							type='button'
							className='ui right floated button'
						>
							{appState.user.username}
						</button>
					</Link>
				</div>

				<Loading mr={'3rem'} />
			</div>
		);

	return (
		<div className='ui container home'>
			<h2 className='home-body_title'>
				Hello <strong>{appState.user.username}</strong>, here is your
				feed.
			</h2>
			<div className='mt-s'>
				<Link to='/journal/write'>
					<button type='button' className='positive ui button'>
						Write you own!
					</button>
				</Link>
				<Link to={appState.user.username}>
					<button type='button' className='ui right floated button'>
						{appState.user.username}
					</button>
				</Link>
			</div>

			<div className='mt-s home-body'>
				{isEmpty ? (
					<HomeNoFeed />
				) : (
					<JournalFeed journals={journalData} />
				)}
			</div>
		</div>
	);
};

export default Home;
