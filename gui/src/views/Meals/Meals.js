import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import MealsList from './MealsList';
import MealsEdit from './MealsEdit';

const Meals = () => {
	return (
		<div className="container">
			<Helmet>
				<title>Platos de comida</title>
			</Helmet>
			<Switch>
				<Route path="/meals" exact component={MealsList} />
				<Route path="/meals/:id" component={MealsEdit} />
			</Switch>
		</div>
	);
};

export default Meals;
