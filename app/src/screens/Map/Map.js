import React, { Component, Fragment } from 'react';
import {
	Platform,
	View,
	Text,
	PermissionsAndroid,
	StyleSheet,
	Dimensions
} from 'react-native';
import MapView, { ProviderPropType, Marker } from 'react-native-maps';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const customStyle = [
	{
		elementType: 'geometry',
		stylers: [
			{
				color: '#242f3e'
			}
		]
	},
	{
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#746855'
			}
		]
	},
	{
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#242f3e'
			}
		]
	},
	{
		featureType: 'administrative.locality',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d59563'
			}
		]
	},
	{
		featureType: 'poi',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d59563'
			}
		]
	},
	{
		featureType: 'poi.park',
		elementType: 'geometry',
		stylers: [
			{
				color: '#263c3f'
			}
		]
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#6b9a76'
			}
		]
	},
	{
		featureType: 'road',
		elementType: 'geometry',
		stylers: [
			{
				color: '#38414e'
			}
		]
	},
	{
		featureType: 'road',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: '#212a37'
			}
		]
	},
	{
		featureType: 'road',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#9ca5b3'
			}
		]
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry',
		stylers: [
			{
				color: '#746855'
			}
		]
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: '#1f2835'
			}
		]
	},
	{
		featureType: 'road.highway',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#f3d19c'
			}
		]
	},
	{
		featureType: 'transit',
		elementType: 'geometry',
		stylers: [
			{
				color: '#2f3948'
			}
		]
	},
	{
		featureType: 'transit.station',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d59563'
			}
		]
	},
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{
				color: '#17263c'
			}
		]
	},
	{
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#515c6d'
			}
		]
	},
	{
		featureType: 'water',
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#17263c'
			}
		]
	}
];

class MapStyle extends Component {
	static navigationOptions = {
		title: 'Confirmar entrega',
		tabBarIcon: ({ focused, horizontal, tintColor }) => {
			return <Ionicons name="ios-locate" size={25} color={tintColor} />;
		}
	};
	state = {
		granted: false,
		data: null,
		latitude: null,
		longitude: null
	};
	componentDidMount() {
		this.requestPermission();
	}
	requestPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: 'Permiso para geolocalización',
					message: 'Necesitamos tu permiso para mostrar tu posición.',
					buttonNeutral: 'Preguntarme luego',
					buttonNegative: 'Cancelar',
					buttonPositive: 'OK'
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('You can use the geolocation');
				this.setState({ granted: true }, this.getPosition);
			} else {
				console.log('Geolocation permission denied');
				this.setState({ granted: false });
			}
		} catch (err) {
			console.warn(err);
		}
	};
	getPosition = () => {
		navigator.geolocation.getCurrentPosition(
			data => {
				console.log('data', data);
				this.setState({
					data: data,
					latitude: data.coords.latitude,
					longitude: data.coords.longitude
				});
			},
			error => {
				console.log('Error', error);
				alert('Hubo un error al obtener la geolocalizacion!');
			}
		);
	};
	cancelHandler = () => this.props.navigation.navigate('Home');
	shareHandler = () => {
		this.props.navigation.navigate('Chat');
	};
	render() {
		const actions = [
			{
				text: 'Compartir ubicación',
				name: 'bt_share',
				color: 'green',
				icon: (
					<Icon
						name={Platform.OS === 'ios' ? 'ios-share' : 'md-share'}
						color="#fff"
						size={25}
					/>
				),
				position: 1
			},
			{
				text: 'Regresar',
				name: 'bt_cancel',
				color: 'red',
				icon: (
					<Icon
						name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
						color="#fff"
						size={25}
					/>
				),
				position: 3
			}
		];
		return this.state.granted ? (
			this.state.data && (
				<View style={styles.container}>
					<MapView
						provider={'google'}
						style={styles.map}
						initialRegion={{
							latitude: this.state.latitude,
							longitude: this.state.longitude,
							latitudeDelta: LATITUDE_DELTA,
							longitudeDelta: LONGITUDE_DELTA
						}}
						customMapStyle={customStyle}
					>
						<Marker
							draggable
							coordinate={{
								latitude: this.state.latitude,
								longitude: this.state.longitude
							}}
							onDragEnd={e => {
								console.log(e.nativeEvent.coordinate);
								this.setState({
									latitude: e.nativeEvent.coordinate.latitude,
									longitude: e.nativeEvent.coordinate.longitude
								});
							}}
						/>
					</MapView>
					<FloatingAction
						position="left"
						color="red"
						actions={actions}
						onPressItem={name => {
							if (name === 'bt_share') {
								this.shareHandler();
							} else if (name === 'bt_cancel') {
								this.cancelHandler();
							}
						}}
					/>
				</View>
			)
		) : (
			<Text>No obtuvimos permiso :(</Text>
		);
	}
}

MapStyle.propTypes = {
	provider: ProviderPropType
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	map: {
		...StyleSheet.absoluteFillObject
	}
});

export default MapStyle;
