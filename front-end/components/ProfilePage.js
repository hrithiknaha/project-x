import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, withRouter } from 'react-router-dom';
import Axios from 'axios';

import { dateFormat } from '../helpers/date';

import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';

import JournalFeed from './JournalFeed';
import Loading from './Loading';

const ProfilePage = (props) => {
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);

	const { username } = useParams();
	const [profileData, setProfileData] = useState({
		name: '...',
		username,
		id: '...',
		dateCreated: Date
	});
	const [journalData, setjournalData] = useState([]);
	const [isLoading, setisLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await Axios.post('/account/' + username);
				const { err } = response.data;
				if (err) {
					appDispatch({ type: 'flashMessage', value: err });
					props.history.push('/');
				} else {
					setProfileData(response.data.user);
					setjournalData(response.data.journals);
					setisLoading(false);
				}
			} catch (e) {
				console.log('There was a problem' + e);
			}
		}

		fetchData();
	}, []); //[] means run only for the first time when the component is rendered

	function handleLogout(e) {
		appDispatch({ type: 'logout' });
		Axios.get('/logout');
		props.history.push('/');
	}

	if (isLoading) return <Loading />;

	return (
		<div className='mt-s ui container pr'>
			<div className='text-center pr-username'>
				<h2 className='text-center home-body_title'>
					Hello <strong>{profileData.username}</strong>
				</h2>
				<p className='pr-date'>
					Wizard since {dateFormat(profileData.dateCreated)}
				</p>
			</div>
			<div className='mt-s mb-s'>
				{appState.loggedIn && (
					<Link to='/'>
						<button type='button' className='ui button'>
							Home Journals
						</button>
					</Link>
				)}

				{appState.loggedIn && (
					<Link to='/write/journal'>
						<button type='button' className='ui positive button'>
							Write you own!
						</button>
					</Link>
				)}

				{appState.loggedIn && (
					<button
						type='button'
						className='ui button right floated'
						onClick={handleLogout}
					>
						Logout
					</button>
				)}
			</div>

			<JournalFeed journals={journalData} />
		</div>
	);
};

export default withRouter(ProfilePage);
