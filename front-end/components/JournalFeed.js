import React from 'react';

import Journal from './Journal';

const JournalFeed = (props) => {
	return (
		<div className='ui three column doubling stackable masonry grid'>
			{props.journals.map((journal) => {
				return <Journal key={journal._id} journal={journal} />;
			})}
		</div>
	);
};

export default JournalFeed;
