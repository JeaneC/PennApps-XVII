import React from 'react';
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	View,
	Platform,
	Dimensions
} from 'react-native';

const OS = Platform.OS;
const dimensions = Dimensions.get('window');
const SCREEN_WIDTH = dimensions.width;

import { FADE, WHITE, LARGE, MEDIUM, SMALL } from '../common/constants';

const TEXT_BOX_HEIGHT = 125;
const BUTTON_BORDER_RADIUS = 15;
const BUTTON_COLOR = WHITE;

const QuestionBox = ({
	question = 'Prev',
	userPrivate = false,
	name = 'Ashley',
	empty
}) => {
	let security = userPrivate ? 'Private' : 'Public';
	security = empty ? '' : security;
	let hyphen = empty ? '' : '-';
	return (
		<View style={styles.container}>
			<Text style={styles.questionAuthor}>
				{name} {hyphen} {security}
			</Text>
			<View style={styles.button}>
				<View style={styles.fade} />
				<Text style={styles.text}>{question}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	fade: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		borderRadius: BUTTON_BORDER_RADIUS,
		backgroundColor: BUTTON_COLOR,
		opacity: FADE - 0.1
	},
	container: {
		width: SCREEN_WIDTH,
		height: TEXT_BOX_HEIGHT,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		width: SCREEN_WIDTH - 50,
		height: TEXT_BOX_HEIGHT - 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 8,
		marginTop: 10,
		paddingLeft: 5,
		paddingRight: 5
	},
	image: {
		flex: 0.8,
		resizeMode: 'contain'
	},
	text: {
		color: 'white',
		fontSize: SMALL + 3,
		fontWeight: 'bold'
	},
	questionAuthor: {
		color: 'white',
		alignSelf: 'flex-start',
		marginLeft: 25,
		fontSize: 16,
		marginTop: 50,
		fontWeight: 'bold'
	}
});

export default QuestionBox;
