import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import MyOrdersList from './MyOrdersList';
import MyOrdersEdit from './MyOrdersEdit';

const Orders = () => {
	return (
		<div className="container">
			<Helmet>
				<title>Mis Ordenes</title>
			</Helmet>
			<Switch>
				<Route path="/myorders" exact component={MyOrdersList} />
				<Route path="/myorders/:id" component={MyOrdersEdit} />
			</Switch>
		</div>
	);
};

export default Orders;
