import React from 'react';

const HomeFeed = () => {
	return (
		<div className='card-columns'>
			<div className='card border-primary'>
				<div className='card-body'>
					<h5 className='card-title'>Card title</h5>
					<p className='card-text'>
						This is a longer card with supporting text below as a
						natural lead-in to additional content. This content is a
						little bit longer.
					</p>
					<p className='card-text'>
						<small className='text-muted'>
							Last updated 3 mins ago
						</small>
					</p>
				</div>
			</div>
			<div className='card'>
				<div className='card-body'>
					<h5 className='card-title'>Card title</h5>
					<p className='card-text'>
						This card has supporting text below as a natural lead-in
						to additional content.
					</p>
					<p className='card-text'>
						<small className='text-muted'>
							Last updated 3 mins ago
						</small>
					</p>
				</div>
			</div>
			<div className='card'>
				<div className='card-body'>
					<h5 className='card-title'>Card title</h5>
					<p className='card-text'>
						This is a wider card with supporting text below as a
						natural lead-in to additional content. This card has
						even longer content than the first to show that equal
						height action.
					</p>
					<p className='card-text'>
						<small className='text-muted'>
							Last updated 3 mins ago
						</small>
					</p>
				</div>
			</div>
		</div>
	);
};

export default HomeFeed;
