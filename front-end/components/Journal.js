import React from 'react';
import { Link } from 'react-router-dom';

const Journal = (props) => {
	const accent = `card border-primary journal-hover ${props.journal.genre}`;
	return (
		<Link to={`/journals/${props.journal._id}`} className='no-deco-link'>
			<div className={accent}>
				<div className='card-body'>
					<h5 className='card-title'>
						{props.journal.title}
						<span className='float-right badge badge-primary'>
							{props.journal.genre}
						</span>
					</h5>
					<p className='card-text'>{props.journal.prologue}</p>
					<p className='card-text'>
						<small className='text-muted'>
							Last updated 3 mins ago
						</small>
					</p>
				</div>
			</div>
		</Link>
	);
};

export default Journal;
