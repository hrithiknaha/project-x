import React, { useState, useContext } from 'react';
import Axios from 'axios';

import SignUpForm from './SignUpForm';
import LogInForm from './LogInForm';

const HomeGuest = () => {
	const [switchT, setSwitchT] = useState(false);

	function handleSwitch() {
		setSwitchT(!switchT);
	}

	return (
		<div className='hg'>
			<div className='ui container grid hg-grid'>
				<div className='ten wide column'>
					<h1 className='hg-title'>Fondness - over - writing</h1>
					<p className='hg-subtitle'>
						In short this is ig for writers, atleast that is what i
						had kept in mind while making this. Well, there are many
						changes to be made henceforth, many updates to be
						updated. But, i guess it is in a stage now where it is
						ready to be published so here it is.
					</p>
				</div>
				<div className='six wide column'>
					{switchT ? <SignUpForm /> : <LogInForm />}
					<div className='ui toggle checkbox hg-toggle'>
						<input
							type='checkbox'
							name='public'
							onChange={handleSwitch}
						/>
						<label>{switchT ? 'Login' : 'Signup'}</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeGuest;
