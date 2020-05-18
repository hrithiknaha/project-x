import React, { useState } from 'react';

import HomeNoFeed from './HomeNoFeed';
import HomeFeed from './HomeFeed';

const Home = () => {
	const [isEmpty, setIsEmpty] = useState(false);
	return (
		<div className='mt-5 container container--narrow py-md-5 home'>
			<button type='button' className='btn btn-secondary home-write'>
				Write your own!
			</button>
			<div className='mt-5 home-body'>
				{isEmpty ? <HomeNoFeed /> : <HomeFeed />}
			</div>
		</div>
	);
};

export default Home;
