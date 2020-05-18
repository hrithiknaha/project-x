import React from 'react';
import ReactDOM from 'react-dom';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';

import DispatchContext from './DispatchContext';
import StateContext from './StateContext';

import './scss/style.scss';

Axios.defaults.baseURL = 'http://localhost:3000';

//Components
import HomeGuest from './components/HomeGuest';
import Home from './components/Home';
import FlashMessages from './components/FlashMessages';

const Main = () => {
	const initialState = {
		loggedIn: Boolean(localStorage.getItem('fowUsername')),
		flashMessages: [],
		user: {}
	};

	function reducer(draft, action) {
		switch (action.type) {
			case 'login':
				draft.loggedIn = true;
				draft.user = action.user;
				return;
			case 'flashMessage':
				draft.flashMessages.push(action.value);
				return;
		}
	}

	const [state, dispatch] = useImmerReducer(reducer, initialState);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<BrowserRouter>
					<FlashMessages />
					<Switch>
						<Route path='/' exact>
							{state.loggedIn ? <Home /> : <HomeGuest />}
						</Route>
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
