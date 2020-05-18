import React, { useContext } from 'react';

import StateContext from '../StateContext';

const FlashMessages = (props) => {
	const appState = useContext(StateContext);
	return (
		<div>
			<div className='floating-alerts'>
				{appState.flashMessages.map((msg, index) => {
					return (
						<div
							key={index}
							className='alert alert-success text-center floating-alert shadow-sm'
						>
							{msg}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default FlashMessages;
