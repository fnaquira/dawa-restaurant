import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';

import { styles } from '../../styles/global';

import getAvatar from '../../lib/avatar';

import IconBox from '../../components/UI/IconBox';
import Badge from '../../components/UI/Badge';

class Profile extends Component {
	editProfileHandler = () => {
		this.props.navigation.navigate('ProfileEdit');
	};
	render() {
		return (
			<ScrollView>
				<Badge
					userName={this.props.userName}
					email={this.props.userEmail}
					avatar={getAvatar(this.props.userEmail)}
				/>
				<View style={styles.iconContainer}>
					<IconBox
						value={'Editar'}
						label={'Modificar perfil'}
						icon={require('../../assets/img/icon-edit.png')}
						onPress={this.editProfileHandler}
					/>
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => {
	return {
		userName: state.name,
		userEmail: state.email
	};
};

export default connect(mapStateToProps)(Profile);
