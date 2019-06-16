import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Carousel from '../components/Carousel/Carousel';

const Home = () => {
	return (
		<Fragment>
			<Carousel />
			<div className="container">
				<div className="jumbotron">
					<h1>Bienvenido a mi aplicación!</h1>
					<p>
						<Link className="btn btn-primary btn-lg" to="login">
							Inicie sesión
						</Link>
					</p>
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
