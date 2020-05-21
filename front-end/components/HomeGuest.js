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
		<div className='container py-md-5'>
			<div className='row align-items-center hg'>
				<div className='col-lg-7 py-3 py-md-5'>
					<h1 className='display-4'>Fondness - over - writing</h1>
					<p className='lead text-muted'>
						In short this is ig for writers, atleast that is what i
						had kept in mind while making this. Well, there are many
						changes to be made henceforth, many updates to be
						updated. But, i guess it is in a stage now where it is
						ready to be published so here it is.
					</p>
				</div>
				<div className='col-lg-5 pl-lg-5 pb-3 py-lg-5'>
					{switchT ? <SignUpForm /> : <LogInForm />}
					<div className='mt-2 form-group custom-control custom-switch'>
						<input
							type='checkbox'
							className='custom-control-input'
							id='customSwitch1'
							onChange={handleSwitch}
						/>
						<label
							className='custom-control-label text-muted'
							htmlFor='customSwitch1'
						>
							{switchT ? 'Sign Up' : 'Log In'}
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeGuest;
