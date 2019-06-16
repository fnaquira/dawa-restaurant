import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class MyOrder extends Component {
	static navigationOptions = {
		title: 'Mi Orden',
		tabBarIcon: ({ focused, horizontal, tintColor }) => {
			return <Ionicons name="ios-cart" size={25} color={tintColor} />;
		}
	};
	render() {
		return (
			<ScrollView>
				<Text>asds</Text>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => {
	return {
		items: state.items
	};
};

export default connect(mapStateToProps)(MyOrder);
