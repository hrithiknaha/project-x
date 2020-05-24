import React from 'react';
import { Link } from 'react-router-dom';

import { dateCount } from '../helpers/date';

const Journal = (props) => {
	const accent = `column ${props.journal.genre}`;
	return (
		<Link
			to={{
				pathname: `/journal/${props.journal._id}`,
				state: {
					journal: props.journal
				}
			}}
			className='no-deco-link column'
		>
			<div class={accent}>
				<div class='ui fluid card journal-hover'>
					<div class='content'>
						<div class='ui top right attached label'>
							{props.journal.genre.toUpperCase()}
						</div>
						<div class='header'>{props.journal.title}</div>
						{/* <div class='meta'>
							<span class='category'>
								{dateCount(props.journal.writtenAt)}
							</span>
						</div> */}
						<div class='description'>
							<p>{props.journal.prologue}</p>
							<br />
							Posted | <i>{dateCount(props.journal.writtenAt)}</i>
						</div>
					</div>
					<div class='extra content'>
						<div class='right floated author'>
							{/* <img
							class='ui avatar image'
							src='/images/avatar/small/matt.jpg'
						/>{' '} */}
							{props.journal.author.username}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Journal;
