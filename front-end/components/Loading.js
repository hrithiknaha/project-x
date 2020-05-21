import React from 'react';

const Loading = (props) => {
	return (
		<div className='loading'>
			<p className='loading-text'>Wait, your content is loading</p>
			<div className='d-flex justify-content-center'>
				<div className='spinner-border loading-main' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			</div>
		</div>
	);
};

export default Loading;
