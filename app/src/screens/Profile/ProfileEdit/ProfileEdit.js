import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { styles } from '../../../styles/global';

class ProfileEdit extends Component {
	state = {
		userId: null,
		userName: this.props.userName,
		userEmail: this.props.userEmail,
		picture: ''
	};
	static navigationOptions = {
		drawerLabel: () => null
	};
	inputHandler = (text, field) => {
		this.setState({ [field]: text });
	};
	render() {
		return (
			<ScrollView style={formStyles.container}>
				<Text style={styles.subtitle}>Editar perfil</Text>
				<Input
					placeholder="Nombre de usuario"
					leftIcon={{ type: 'font-awesome', name: 'user' }}
					inputContainerStyle={formStyles.input}
					value={this.state.userName}
					onChangeText={text => this.inputHandler(text, 'userName')}
				/>
				<Input
					placeholder="Correo electrónico"
					leftIcon={{ type: 'font-awesome', name: 'envelope' }}
					inputContainerStyle={formStyles.input}
					value={this.state.userEmail}
					onChangeText={text => this.inputHandler(text, 'userEmail')}
				/>
				<Button title="Guardar Perfil" containerStyle={formStyles.button} />
			</ScrollView>
		);
	}
}

const formStyles = StyleSheet.create({
	container: {
		padding: 10
	},
	input: {
		marginTop: 10
	},
	button: {
		marginTop: 10
	}
});

const mapStateToProps = state => {
	return {
		userName: state.name,
		userEmail: state.email
	};
};

export default connect(mapStateToProps)(ProfileEdit);
