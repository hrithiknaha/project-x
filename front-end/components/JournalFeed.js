import React from 'react';

import Journal from './Journal';

const JournalFeed = (props) => {
	return (
		<div className='card-columns mt-5'>
			{props.journals.map((journal) => {
				return <Journal key={journal._id} journal={journal} />;
			})}
		</div>
	);
};

export default JournalFeed;
