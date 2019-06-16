import React, { Fragment } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Layout = props => {
	return (
		<Fragment>
			<Header />
			<main id="main">{props.children}</main>
			<Footer />
		</Fragment>
	);
};

export default Layout;
