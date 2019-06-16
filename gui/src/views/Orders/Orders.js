import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import OrdersList from './OrdersList';
import OrdersEdit from './OrdersEdit';

const Orders = () => {
	return (
		<div className="container">
			<Helmet>
				<title>Ordenes</title>
			</Helmet>
			<Switch>
				<Route path="/orders" exact component={OrdersList} />
				<Route path="/orders/:id" component={OrdersEdit} />
			</Switch>
		</div>
	);
};

export default Orders;
