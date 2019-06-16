import React, { Fragment } from 'react';

import './Spinner.css';

const Spinner = () => {
	return (
		<Fragment>
			<div className="lds-ellipsis">
				<div />
				<div />
				<div />
				<div />
			</div>
		</Fragment>
	);
};

export default Spinner;
