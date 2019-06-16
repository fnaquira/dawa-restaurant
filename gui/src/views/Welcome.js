import React from 'react';

const Welcome = props => {
	const userName = localStorage.getItem('userName');
	return (
		<div name="container">
			<div className="jumbotron">
				<h1>Bienvenido {userName}!</h1>
				<button
					className="btn btn-primary"
					onClick={() => {
						props.history.push('/chat');
					}}
				>
					Vamos al Chat!
				</button>
			</div>
		</div>
	);
};

export default Welcome;
