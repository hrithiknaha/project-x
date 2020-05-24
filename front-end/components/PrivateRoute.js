import React, { useContext } from 'react';
import { Route } from 'react-router-dom';

import StateContext from '../StateContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const appState = useContext(StateContext);
	return (
		<Route
			{...rest}
			render={(props) =>
				appState.loggedIn ? (
					<Component {...props} />
				) : (
					<Redirect to='/' />
				)
			}
		/>
	);
};

export default PrivateRoute;
