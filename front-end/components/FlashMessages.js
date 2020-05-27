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
							className='ui message floating-alert flash'
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
