import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	StatusBar,
	ImageBackground,
	ToastAndroid,
	KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Fumi } from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-community/async-storage';

import axios from '../../lib/axios';

import imgBackground from '../../assets/img/background-login.jpg';

export default class SignInScreen extends React.Component {
	static navigationOptions = {
		title: 'Registrarse',
		tabBarIcon: ({ focused, horizontal, tintColor }) => {
			return <Ionicons name="ios-clipboard" size={25} color={tintColor} />;
		}
	};
	state = {
		user: '',
		name: '',
		password: '',
		password2: '',
		loading: false,
		showPassword: false,
		showPassword2: false
	};
	showPassword = () => {
		this.setState({ showPassword: !this.state.showPassword });
	};
	inputHandler = (field, value) => {
		this.setState({ [field]: value });
	};
	onSubmitHandler = () => {
		if (
			this.state.user === '' ||
			this.state.name === '' ||
			this.state.password === ''
		) {
			return ToastAndroid.showWithGravity(
				'Falta ingresar datos!',
				ToastAndroid.SHORT,
				ToastAndroid.TOP
			);
		}
		if (this.state.password !== this.state.password2) {
			return ToastAndroid.showWithGravity(
				'Las contraseñas no coinciden',
				ToastAndroid.SHORT,
				ToastAndroid.TOP
			);
		}
		this.setState({ loading: true });
		axios({
			method: 'POST',
			url: 'api/auth/signup',
			data: {
				email: this.state.user,
				name: this.state.name,
				password: this.state.password
			}
		})
			.then(async response => {
				ToastAndroid.showWithGravity(
					response.data.message,
					ToastAndroid.LONG,
					ToastAndroid.TOP
				);
				await AsyncStorage.setItem('userName', response.data.name);
				await AsyncStorage.setItem('userEmail', this.state.user);
				await AsyncStorage.setItem('userRol', response.data.rol);
				await AsyncStorage.setItem('userToken', response.data.token);
				this.props.navigation.navigate('App');
			})
			.catch(err => {
				ToastAndroid.showWithGravity(
					'Hubo un error en el registro',
					ToastAndroid.LONG,
					ToastAndroid.TOP
				);
				console.warn(err);
				this.setState({ loading: false });
			});
	};
	loginHandler = () => {
		this.props.navigation.navigate('SignIn');
	};
	render() {
		if (this.state.loading === true) {
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
										label={'Nombre'}
										iconClass={Icon}
										onChangeText={text => this.inputHandler('name', text)}
										iconName={'person'}
										value={this.state.name}
										iconColor={'#fff'}
										labelStyle={{ color: 'white' }}
										iconSize={30}
										iconWidth={40}
										inputPadding={16}
									/>
								</View>
								<View>
									<Fumi
										style={{
											backgroundColor: '#46494f',
											opacity: 0.8,
											marginBottom: 10
										}}
										label={'Usuario (email)'}
										iconClass={Icon}
										keyboardType="email-address"
										onChangeText={text => this.inputHandler('user', text)}
										iconName={'mail'}
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
								<View style={{ flexDirection: 'row' }}>
									<Fumi
										style={{
											width: '82%',
											backgroundColor: '#46494f',
											opacity: 0.8
										}}
										label={'Confirmar Contraseña'}
										labelStyle={{ color: 'white' }}
										onChangeText={text => this.inputHandler('password2', text)}
										secureTextEntry={!this.state.showPassword2}
										value={this.state.password2}
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
										name={this.state.showPassword2 ? 'md-eye' : 'md-eye-off'}
										onPress={this.showPassword2}
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
										Registrar cuenta
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
										Ya tienes una cuenta?
										<Text
											onPress={this.loginHandler}
											style={{
												color: '#fff',
												fontSize: 16,
												fontWeight: 'bold'
											}}
										>
											{' '}
											Inicia sesión aquí
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
