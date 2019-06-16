import React from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
	ToastAndroid,
	KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Fumi } from 'react-native-textinput-effects';

import axios from '../../lib/axios';
import * as actions from '../../store/actions/actions';

import imgBackground from '../../assets/img/sala-cine.jpg';

class SignInScreen extends React.Component {
	static navigationOptions = {
		title: 'Inicie sesión',
		tabBarIcon: ({ focused, horizontal, tintColor }) => {
			return <Ionicons name="ios-contact" size={25} color={tintColor} />;
		}
	};
	state = {
		user: '',
		password: '',
		showPassword: false
	};
	showPassword = () => {
		this.setState({ showPassword: !this.state.showPassword });
	};
	inputHandler = (field, value) => {
		this.setState({ [field]: value });
	};
	onSubmitHandler = () => {
		if (this.state.user === '' || this.state.password === '') {
			return ToastAndroid.showWithGravity(
				'Falta ingresar datos!',
				ToastAndroid.SHORT,
				ToastAndroid.TOP
			);
		}
		this.props.onAuth(this.state.user, this.state.password, () => {
			this.props.navigation.navigate('App');
		});
	};
	registerHandler = () => {
		this.props.navigation.navigate('SignUp');
	};
	render() {
		return (
			<View style={{ flex: 1 }}>
				<ImageBackground
					source={imgBackground}
					style={{ width: '100%', height: '100%' }}
				>
					<KeyboardAvoidingView
						behavior="position"
						style={{ justifyContent: 'center' }}
						enabled
					>
						<Text
							style={{
								textAlign: 'center',
								fontWeight: 'bold',
								fontSize: 48,
								color: '#fff'
							}}
						>
							Tecsup Videos
						</Text>
						<View style={{ padding: 10 }}>
							<View style={{ marginTop: 10 }}>
								<View>
									<Fumi
										style={{
											backgroundColor: '#46494f',
											opacity: 0.8,
											marginBottom: 10
										}}
										label={'Usuario'}
										iconClass={Icon}
										keyboardType="email-address"
										onChangeText={text => this.inputHandler('user', text)}
										iconName={'person'}
										value={this.state.user}
										iconColor={'#fff'}
										labelStyle={{ color: 'white' }}
										iconSize={30}
										iconWidth={40}
										inputPadding={16}
									/>
								</View>
								<View style={{ flexDirection: 'row' }}>
									<Fumi
										style={{
											width: '82%',
											backgroundColor: '#46494f',
											opacity: 0.8
										}}
										label={'Contraseña'}
										labelStyle={{ color: 'white' }}
										onChangeText={text => this.inputHandler('password', text)}
										secureTextEntry={!this.state.showPassword}
										value={this.state.password}
										iconClass={Icon}
										iconName={'key'}
										iconColor={'#fff'}
										iconSize={30}
										iconWidth={40}
										inputPadding={16}
									/>
									<Icon
										color="#fff"
										style={{
											padding: 20,
											alignItems: 'center',
											backgroundColor: '#46494f',
											opacity: 0.8,
											height: 65
										}}
										size={25}
										name={this.state.showPassword ? 'md-eye' : 'md-eye-off'}
										onPress={this.showPassword}
									/>
								</View>
								<TouchableOpacity
									onPress={this.onSubmitHandler}
									style={{
										marginTop: 20,
										padding: 15,
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 25,
										backgroundColor: '#dcdcdc'
									}}
								>
									<Text
										style={{
											color: '#46494f',
											fontSize: 15,
											fontWeight: 'bold'
										}}
									>
										Iniciar Sesión
									</Text>
								</TouchableOpacity>
								<View
									style={{
										marginTop: 10,
										justifyContent: 'center',
										alignItems: 'center',
										alignSelf: 'center'
									}}
								>
									<Text style={{ color: '#fff', fontSize: 14 }}>
										No tienes una cuenta?
										<Text
											onPress={this.registerHandler}
											style={{
												color: '#fff',
												fontSize: 16,
												fontWeight: 'bold'
											}}
										>
											{' '}
											Registrate aquí
										</Text>
									</Text>
								</View>
							</View>
						</View>
					</KeyboardAvoidingView>
				</ImageBackground>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.token !== null,
		loading: state.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (username, password, callback) => {
			dispatch(actions.auth(username, password, callback));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignInScreen);
