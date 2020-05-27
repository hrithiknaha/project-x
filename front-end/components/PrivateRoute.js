import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (appState.loggedIn) {
					return <Component {...props} />;
				} else {
					appDispatch({
						type: 'flashMessage',
						value: 'You have to login first, Billy!'
					});
					return <Redirect to='/' />;
				}
			}}
		/>
	);
};

export default PrivateRoute;
