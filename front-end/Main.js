import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';

import DispatchContext from './DispatchContext';
import StateContext from './StateContext';

import './scss/style.scss';

Axios.defaults.baseURL = 'http://localhost:3000';
Axios.defaults.withCredentials = true;

//Components
import HomeGuest from './components/HomeGuest';
import Home from './components/Home';
import FlashMessages from './components/FlashMessages';
import ProfilePage from './components/ProfilePage';
import WriteJournal from './components/WriteJournal';
import JournalExpanded from './components/JournalExpanded';
import EditJournal from './components/EditJournal';

import PrivateRoute from './components/PrivateRoute';

const Main = () => {
	const initialState = {
		loggedIn: Boolean(localStorage.getItem('fowUsername')),
		flashMessages: [],
		user: {
			username: localStorage.getItem('fowUsername'),
			email: localStorage.getItem('fowEmail'),
			name: localStorage.getItem('fowName'),
			date: localStorage.getItem('fowDate')
		}
	};

	function reducer(draft, action) {
		switch (action.type) {
			case 'login':
				draft.loggedIn = true;
				draft.user = action.user;
				console.log('Inside login');
				return;
			case 'logout':
				draft.loggedIn = false;
				return;
			case 'flashMessage':
				draft.flashMessages.push(action.value);
				return;
		}
	}

	const [state, dispatch] = useImmerReducer(reducer, initialState);

	useEffect(() => {
		if (state.loggedIn) {
			localStorage.setItem('fowName', state.user.name);
			localStorage.setItem('fowEmail', state.user.email);
			localStorage.setItem('fowUsername', state.user.username);
			localStorage.setItem('fowDate', state.user.date);
		} else {
			localStorage.removeItem('fowName');
			localStorage.removeItem('fowEmail');
			localStorage.removeItem('fowUsername');
			localStorage.removeItem('fowDate');
		}
	}, [state.loggedIn]);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<BrowserRouter>
					<FlashMessages />
					<Switch>
						<Route
							path='/'
							exact
							component={state.loggedIn ? Home : HomeGuest}
						/>
						<PrivateRoute
							path='/:username'
							exact
							component={ProfilePage}
						/>
						<PrivateRoute
							path='/journal/write'
							component={WriteJournal}
						/>
						<PrivateRoute
							path='/journal/edit'
							component={EditJournal}
						/>
						<PrivateRoute
							path='/journal/:id'
							component={JournalExpanded}
						/>
					</Switch>
				</BrowserRouter>
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
};

ReactDOM.render(<Main />, document.querySelector('#app'));

if (module.hot) {
	module.hot.accept();
}
