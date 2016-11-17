import React, { PropTypes } from 'react';
import {
	StyleSheet,
} from 'react-native';
import {
	Container,
	Header,
	Title,
	Button,
	View,
} from 'native-base';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	button: {
		marginTop: 20,
		alignSelf: 'center',
		width: 150,
	},
});

const Main = (props) => {
	const routeStack = props.navigator.getCurrentRoutes();
	return (
		<Container>
			<View style={styles.container}>
				<Header>
					<Title>Welcome</Title>
				</Header>
				<View>
					<Button
						style={styles.button}
						onPress={() => props.navigator.jumpTo(routeStack[1])
					}
					>
						Login
					</Button>
					<Button
						style={styles.button}
						onPress={() => props.navigator.jumpTo(routeStack[2])
					}
					>
						Register
					</Button>
				</View>
			</View>
		</Container>
	);
};

Main.propTypes = {
	navigator: PropTypes.shape({
		getCurrentRoutes: PropTypes.func,
		jumpTo: PropTypes.func,
	}),
};

export default Main;
