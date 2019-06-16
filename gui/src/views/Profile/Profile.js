import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import ProfileDetails from './ProfileDetails/ProfileDetails';
import ProfileEdit from './ProfileEdit/ProfileEdit';

const Profile = () => {
	return (
		<div className="container">
			<Helmet>
				<title>Perfil del usuario</title>
			</Helmet>
			<Switch>
				<Route path="/profile" exact component={ProfileDetails} />
				<Route path="/profile/edit" component={ProfileEdit} />
			</Switch>
		</div>
	);
};

export default Profile;
