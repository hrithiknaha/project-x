import React from 'react';
import ReactDOM from 'react-dom';

import React from 'react';

const Main = () => {
	return (
		<div>
			<h1>Test From Front end React</h1>
		</div>
	);
};

ReactDOM.render(<Main />, document.querySelector('#app'));

if (module.hot) {
	module.hot.accept();
}
