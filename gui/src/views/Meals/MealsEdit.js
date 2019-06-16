import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import axios from '../../utils/axios';
import { MEAL_GET, MEAL_CREATE, MEAL_UPDATE } from '../../utils/urls';

import Spinner from '../../components/UI/Spinner/Spinner';

class ProfileEdit extends Component {
	state = {
		name: '',
		image: '',
		price: 1,
		loading: false
	};
	componentDidMount() {
		const mealId = this.props.match.params.id;
		if (mealId !== 'new') {
			this.setState({ loading: true });
			axios({
				...MEAL_GET,
				url: MEAL_GET.url + mealId,
				headers: { Authorization: `Bearer ${this.props.token}` }
			})
				.then(response => {
					this.setState({ loading: false, ...response.data });
				})
				.catch(error => {
					this.setState({ loading: false });
					console.error(error);
					alert('Hubo un error!');
				});
		}
	}
	inputHandler = (event, field) => {
		this.setState({ [field]: event.target.value });
	};
	submitHandler = e => {
		e.preventDefault();
		const mealId = this.props.match.params.id;
		let urlMeal = MEAL_UPDATE;
		if (mealId === 'new') urlMeal = MEAL_CREATE;
		else urlMeal.url = urlMeal.url + mealId;
		const data = {
			name: this.state.name,
			price: this.state.price,
			image: this.state.image
		};
		this.setState({ loading: true });
		axios({
			...urlMeal,
			headers: {
				Authorization: `Bearer ${this.props.token}`
			},
			data: data
		})
			.then(response => {
				console.log(response);
				this.setState({ loading: false });
				this.props.history.push('/meals');
				alert('Plato actualizado con éxito!');
			})
			.catch(error => {
				console.error(error.response);
				this.setState({ loading: false });
				alert(error.response.data.message);
			});
	};
	goBackHandler = e => {
		this.props.history.goBack();
	};
	render() {
		let title = 'Editar Plato';
		if (this.props.match.params.id === 'new') title = 'Crear nuevo Plato';
		let content = <Spinner />;
		if (!this.state.loading) {
			content = (
				<form onSubmit={this.submitHandler}>
					<div className="card-body">
						<div className="form-group">
							<label>Nombre</label>
							<input
								type="text"
								className="form-control"
								placeholder="Ingrese su nombre"
								value={this.state.name}
								onChange={e => this.inputHandler(e, 'name')}
							/>
						</div>
						<div className="form-group">
							<label>Precio</label>
							<input
								type="number"
								className="form-control"
								placeholder="Ingrese el precio"
								value={this.state.price}
								onChange={e => this.inputHandler(e, 'price')}
							/>
							<small className="form-text text-muted">
								Nunca compartiremos tu email con nadie
							</small>
						</div>
						<div className="form-group">
							<label>URL de Imagen</label>
							<input
								type="text"
								className="form-control"
								placeholder="Ingrese su foto"
								value={this.state.image}
								onChange={e => this.inputHandler(e, 'image')}
							/>
						</div>
					</div>
					<div className="card-footer">
						<button className="btn btn-success" type="submit">
							<FontAwesomeIcon icon={faSave} /> Guardar Perfil
						</button>{' '}
						<button
							className="btn btn-danger"
							type="button"
							onClick={this.goBackHandler}
						>
							<FontAwesomeIcon icon={faWindowClose} /> Regresar
						</button>
					</div>
				</form>
			);
		}
		return (
			<div className="container d-flex justify-content-center mt-4 mb-4">
				<div className="card">
					<div className="card-header">{title}</div>
					{content}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.token
	};
};

export default connect(mapStateToProps)(ProfileEdit);
