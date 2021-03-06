import React, { Component, Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import * as actions from '../store/actions/actions';

import Spinner from '../components/UI/Spinner/Spinner';

class Login extends Component {
	state = {
		name: '',
		email: '',
		password: ''
	};
	inputHandler = (e, field) => {
		this.setState({ [field]: e.target.value });
	};
	submitHandler = e => {
		e.preventDefault();
		this.props.onRegister(
			this.state.name,
			this.state.email,
			this.state.password
		);
	};
	render() {
		let content = (
			<Form onSubmit={this.submitHandler}>
				<Form.Group>
					<Form.Label>Nombre</Form.Label>
					<Form.Control
						type="text"
						placeholder="Nombre del usuario"
						value={this.state.name}
						onChange={e => this.inputHandler(e, 'name')}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="text"
						placeholder="Correo Electrónico"
						value={this.state.email}
						onChange={e => this.inputHandler(e, 'email')}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Contraseña</Form.Label>
					<Form.Control
						type="password"
						placeholder="123456"
						value={this.state.password}
						onChange={e => this.inputHandler(e, 'password')}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Crear cuenta
				</Button>{' '}
				<Link to="/login">Si tengo cuenta</Link>
			</Form>
		);
		if (this.props.loading) content = <Spinner />;
		return (
			<Fragment>
				{this.props.isAuthenticated ? <Redirect to="/" /> : null}
				<Helmet>
					<style type="text/css">{`
						body,
						html {
							height: 100%;
							margin: 0;
							background: #7f7fd5;
							background: -webkit-linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
							background: linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
						}
					`}</style>
				</Helmet>
				<div className="container">
					<div className="row justify-content-around">
						<div className="col-6 mt-2 mb-2">
							<div className="card">
								<div className="card-body">{content}</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.loading,
		error: state.error,
		isAuthenticated: state.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onRegister: (name, email, password) =>
			dispatch(actions.register(name, email, password))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
