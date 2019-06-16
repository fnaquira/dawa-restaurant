import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StatusBar, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import * as actions from '../../store/actions/actions';

class AuthLoadingScreen extends React.Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
		this._bootstrapAsync();
	}
	_bootstrapAsync = async () => {
		const userToken = await AsyncStorage.getItem('token');
		this.props.navigation.navigate(userToken ? 'App' : 'Auth');
	};
	render() {
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'stretch'
				}}
			>
				<ActivityIndicator />
				<StatusBar barStyle="default" />
				<Text
					style={{
						textAlign: 'center',
						fontWeight: 'bold'
					}}
				>
					Cargando...
				</Text>
			</View>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	};
};

export default connect(
	null,
	mapDispatchToProps
)(AuthLoadingScreen);
