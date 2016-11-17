import React, { PropTypes } from 'react';
import {
	StyleSheet,
} from 'react-native';
import {
	Icon,
	Text,
	View,
} from 'native-base';

const styles = StyleSheet.create({
	errorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	error: {
		marginRight: 10,
	},
});

const colors = { error: 'red', warning: 'yellow' };

const FormMessage = (props) => {
	const style = { color: colors[props.type] || colors.error };
	if (props.message) {
		return (
			<View style={styles.errorContainer}>
				<Icon name="ios-warning" style={[styles.error, style]} />
				<Text style={[styles.error, style]}>
					{props.message}
				</Text>
			</View>
		);
	}
};

FormMessage.propTypes = {
	message: PropTypes.string,
	type: PropTypes.string,
};

FormMessage.defaultProps = {
	type: 'error',
};

export default FormMessage;
