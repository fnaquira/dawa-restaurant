import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';

import imgLogo from '../../assets/img/logo-tecsup.png';

const Header = props => {
	return (
		<Navbar bg="dark" expand="lg" variant="dark" id="header">
			<div className="container">
				<Link className="navbar-brand" to="/">
					<img src={imgLogo} alt="Tecsup Logo" />
					Tecsup App
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav>
						<NavLink to="/" exact className="nav-link">
							Inicio
						</NavLink>
						{props.isAuthenticated ? (
							<Fragment>
								<NavLink to="/myorders" className="nav-link">
									Mis Ordenes
								</NavLink>
								{props.rol === 'ADMIN' ? (
									<Fragment>
										<NavLink to="/meals" className="nav-link">
											Platos
										</NavLink>
										<NavLink to="/orders" className="nav-link">
											Ordenes (ADMIN)
										</NavLink>
									</Fragment>
								) : null}
								<NavDropdown title="Usuario" id="basic-nav-dropdown">
									<NavLink to="/profile" className="dropdown-item">
										Mi Perfil
									</NavLink>
									<NavDropdown.Divider />
									<NavLink to="/logout" className="dropdown-item">
										Cerrar sesión
									</NavLink>
								</NavDropdown>
							</Fragment>
						) : (
							<NavLink to="/login" className="nav-link">
								Iniciar sesión
							</NavLink>
						)}
					</Nav>
				</Navbar.Collapse>
			</div>
		</Navbar>
	);
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.token !== null,
		rol: state.rol
	};
};

export default connect(mapStateToProps)(Header);
