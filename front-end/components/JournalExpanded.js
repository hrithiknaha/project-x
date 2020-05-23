import React from 'react';
import { Link } from 'react-router-dom';

const JournalExpanded = () => {
	return (
		<div className='container container--narrow py-md-5'>
			<div>
				<Link to='/'>
					<button className='btn btn-secondary button'>Home</button>
				</Link>
			</div>
		</div>
	);
};

export default JournalExpanded;
