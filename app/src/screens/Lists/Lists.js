import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	FlatList,
	ActivityIndicator
} from 'react-native';

export default class Lists extends Component {
	state = {
		loading: true,
		serverData: [],
		fetching_from_server: false,
		offset: 1
	};

	componentDidMount() {
		fetch('http://aboutreact.com/demo/getpost.php?offset=' + this.state.offset)
			.then(response => response.json())
			.then(responseJson => {
				this.setState({
					serverData: [...this.state.serverData, ...responseJson.results],
					offset: this.state.offset + 1,
					loading: false
				});
			})
			.catch(error => {
				console.error(error);
			});
	}

	loadMoreData = () => {
		this.setState({ fetching_from_server: true }, () => {
			fetch(
				'http://aboutreact.com/demo/getpost.php?offset=' + this.state.offset
			)
				.then(response => response.json())
				.then(responseJson => {
					this.setState({
						serverData: [...this.state.serverData, ...responseJson.results],
						offset: this.state.offset + 1,
						fetching_from_server: false
					});
				})
				.catch(error => {
					console.error(error);
				});
		});
	};

	renderFooter = () => {
		return (
			<View style={styles.footer}>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={this.loadMoreData}
					style={styles.loadMoreBtn}
				>
					<Text style={styles.btnText}>Ver más</Text>
					{this.state.fetching_from_server ? (
						<ActivityIndicator color="white" style={{ marginLeft: 8 }} />
					) : null}
				</TouchableOpacity>
			</View>
		);
	};

	render() {
		return (
			<View style={styles.container}>
				{this.state.loading ? (
					<ActivityIndicator size="large" />
				) : (
					<FlatList
						style={{ width: '100%' }}
						keyExtractor={(item, index) => index}
						data={this.state.serverData}
						renderItem={({ item, index }) => (
							<View style={styles.item}>
								<Text style={styles.text}>
									{item.id}
									{'.'}
									{item.title.toUpperCase()}
								</Text>
							</View>
						)}
						ItemSeparatorComponent={() => <View style={styles.separator} />}
						ListFooterComponent={this.renderFooter}
					/>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 30
	},
	item: {
		padding: 10
	},
	separator: {
		height: 0.5,
		backgroundColor: 'rgba(0,0,0,0.4)'
	},
	text: {
		fontSize: 15,
		color: 'black'
	},
	footer: {
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row'
	},
	loadMoreBtn: {
		padding: 10,
		backgroundColor: '#800000',
		borderRadius: 4,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnText: {
		color: 'white',
		fontSize: 15,
		textAlign: 'center'
	}
});
