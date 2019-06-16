import React, { Fragment, Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Layout from './hoc/Layout/Layout';
import Welcome from './views/Welcome';
import Profile from './views/Profile/Profile';
import Meals from './views/Meals/Meals';
import Orders from './views/Orders/Orders';
import MyOrders from './views/MyOrders/MyOrders';
import NotFound from './views/NotFound';

import { connect } from 'react-redux';
import * as actions from './store/actions/actions';

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}
	render() {
		return (
			<BrowserRouter>
				<Layout>
					{this.props.isAuthenticated ? (
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/welcome" component={Welcome} />
							<Route path="/profile" component={Profile} />
							<Route path="/login" component={Login} />
							<Route
								path="/logout"
								render={() => {
									this.props.onLogout();
									return <Redirect to="/login" />;
								}}
							/>
							<Route path="/myorders" component={MyOrders} />
							{this.props.rol === 'ADMIN' ? (
								<Fragment>
									<Route path="/meals" component={Meals} />
									<Route path="/orders" component={Orders} />
								</Fragment>
							) : null}
							<Route component={NotFound} />
						</Switch>
					) : (
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/login" component={Login} />
							<Route path="/signup" component={SignUp} />
							<Route component={NotFound} />
						</Switch>
					)}
				</Layout>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.token !== null,
		rol: state.rol
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
		onLogout: () => dispatch(actions.logout())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
