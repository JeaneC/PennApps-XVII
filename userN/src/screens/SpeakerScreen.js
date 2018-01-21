import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
	Platform,
	Dimensions,
	ScrollView
} from 'react-native';
import { LinearGradient } from 'expo';
import { database, remoteDatabase } from '../firebase/firebase';
import { connect } from 'react-redux';

import SpeakerButton from '../components/SpeakerButton';
import SpeakerQuizButton from '../components/SpeakerQuizButton';
import StartButton from '../components/StartButton';
import QuestionBox from '../components/QuestionBox';
import Feedback from '../components/Feedback';

import { Forward, Rewind, Louder, Lower, ThumbUp, ThumbDown } from '../assets';
import {
	BLUEPURPLE,
	PINKORANGE,
	GREENBLUE,
	WHITE,
	BLACK,
	FADE,
	LARGE,
	MEDIUM,
	BUTTON_BORDER_RADIUS
} from '../common/constants';

const dimensions = Dimensions.get('window');
const SCREEN_WIDTH = dimensions.width;
const SCREEN_HEIGHT = dimensions.height;
const OS = Platform.OS;
const GRADIENT_COLOR = BLUEPURPLE;
const BAR_HEIGHT = 45;

const Bar = ({ text = 'Hello World', top, last }) => {
	const paddingTop = top ? 10 : 0;
	const height = top || last ? BAR_HEIGHT + 15 : BAR_HEIGHT;
	return (
		<View style={[styles.bar, { paddingTop, height }]}>
			<View style={styles.opacityFill} />
			<Text style={[styles.barText]}>{text}</Text>
		</View>
	);
};

const Gap = ({ height = 100, children, row }) => {
	return (
		<View
			style={{
				height,
				width: SCREEN_WIDTH,
				justifyContent: 'space-around',
				alignItems: 'center',
				flexDirection: row ? 'row' : 'column'
			}}
		>
			{children}
		</View>
	);
};

class SpeakerScreen extends Component {
	state = {
		text: "I'm not sure what you did for step 5",
		a: true,
		b: false,
		c: false,
		d: false,
		selected: 'a',
		feedbackList: [],
		questionList: [],
		currentSlide: 1,
		totalSlide: 30,
		title: null,
		theme: BLUEPURPLE,
		question: "I'm not really sure what you did for step 5 in the problem"
	};

	onChoiceSelected = val => {
		switch (val) {
			case 'a':
				this.setState({ a: true, b: false, c: false, d: false, selected: 'a' });
				break;
			case 'b':
				this.setState({ a: false, b: true, c: false, d: false, selected: 'b' });
				break;
			case 'c':
				this.setState({ a: false, b: false, c: true, d: false, selected: 'c' });
				break;
			case 'd':
				this.setState({ a: false, b: false, c: false, d: true, selected: 'd' });
				break;
		}
	};

	componentDidMount() {
		database.ref(`Classes/${this.props.code}/End`).set(false);
		database.ref(`Classes/${this.props.code}/Start`).set(true);

		database
			.ref(`Classes/${this.props.code}/Feedback`)
			.on('child_added', data => {
				let feedbackList = [...this.state.feedbackList];
				feedbackList.push(data.val());
				this.setState({ feedbackList });
			});
		database
			.ref(`Classes/${this.props.code}/Questions`)
			.on('child_added', data => {
				let questionList = [...this.state.questionList];
				questionList.push(data.val());
				this.setState({ questionList });
			});

		remoteDatabase.ref('slides/' + this.props.room).on('value', snapshot => {
			let data = snapshot.val();
			if (data) {
				let current = data.current_slide;
				let total = data.total_slide;
				let slideTitle = data.title;

				if (current <= 1) {
					this.setState({ previousBtnDisabled: true });
				} else {
					this.setState({ previousBtnDisabled: false });
				}

				if (current >= total) {
					this.setState({ nextBtnDisabled: true });
				} else {
					this.setState({ nextBtnDisabled: false });
				}
				database.ref(`Classes/${this.props.code}/Slide`).set(current);
				database.ref(`Classes/${this.props.code}/SlideTotal`).set(total);

				this.setState({
					currentSlide: current,
					totalSlide: total,
					title: slideTitle
				});
			}
		});
	}

	onQuizPress = () => {
		let Value = this.state.selected;
		database.ref(`Classes/${this.props.code}/Quiz`).set({
			Active: true,
			Time: 15,
			Value
		});

		setTimeout(() => {
			database.ref(`Classes/${this.props.code}/Quiz/Active`).set(false);
		}, 5000);
		// We create an object { Active: true, Time: 15, Value: }
		// Create timer to turn off in 5 seconds
	};

	onEndPress = () => {
		database.ref(`Classes/${this.props.code}/End`).set(true);
		database.ref(`Classes/${this.props.code}/Start`).set(false);

		this.props.navigation.goBack();
	};

	nextSlide = () => {
		if (
			this.state.currentSlide < this.state.totalSlide + 1 &&
			this.props.room
		) {
			database
				.ref(`Classes/${this.props.code}/Slide`)
				.set(this.state.currentSlide + 1);
			remoteDatabase
				.ref('slides/' + this.props.room + '/current_slide')
				.set(this.state.currentSlide + 1);
		}
	};

	prevSlide = () => {
		if (this.state.currentSlide > 1 && this.props.room) {
			database
				.ref(`Classes/${this.props.code}/Slide`)
				.set(this.state.currentSlide - 1);
			remoteDatabase
				.ref('slides/' + this.props.room + '/current_slide')
				.set(this.state.currentSlide - 1);
		}
	};

	render() {
		const { container, Wrapper, transparent } = styles;

		return (
			<View style={{ flex: 1 }}>
				<StatusBar barStyle="light-content" />
				<LinearGradient colors={this.props.theme} style={container} />
				<ScrollView style={[Wrapper, transparent]}>
					<Bar text="Remote" top />
					<Gap row height={200}>
						<SpeakerButton text="Prev" onPress={this.prevSlide} />
						<SpeakerButton text="Next" onPress={this.nextSlide} />
					</Gap>
					<Bar text="Feedback" />
					<Gap height={140}>
						<Feedback iconList={this.state.feedbackList} />
					</Gap>
					<Bar text="Questions" />
					<Gap height={180}>
						<ScrollView
							horizontal
							pagingEnabled
							ref={ref => (this.scrollView = ref)}
							onContentSizeChange={(contentWidth, contentHeight) => {
								this.scrollView.scrollToEnd({ animated: true });
							}}
						>
							{this.state.questionList.length == 0 && (
								<QuestionBox question="" name="" empty />
							)}
							{this.state.questionList.map((question, index) => {
								let userPrivate = question.Public ? false : true;
								return (
									<QuestionBox
										key={index}
										question={question.String}
										name={question.Student}
										userPrivate={userPrivate}
									/>
								);
							})}
						</ScrollView>
					</Gap>
					<Bar text="Quiz" />
					<Gap height={200}>
						<View style={{ flexDirection: 'row', marginTop: 10 }}>
							<SpeakerQuizButton
								text="A"
								selected={this.state.a}
								onPress={() => this.onChoiceSelected('a')}
							/>
							<SpeakerQuizButton
								text="B"
								selected={this.state.b}
								onPress={() => this.onChoiceSelected('b')}
							/>
							<SpeakerQuizButton
								text="C"
								selected={this.state.c}
								onPress={() => this.onChoiceSelected('c')}
							/>
							<SpeakerQuizButton
								text="D"
								selected={this.state.d}
								onPress={() => this.onChoiceSelected('d')}
							/>
						</View>
						<StartButton text={'Start'} onPress={this.onQuizPress} />
					</Gap>
					<TouchableOpacity onPress={this.onEndPress}>
						<Bar text="End Session" last />
					</TouchableOpacity>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	Wrapper: {
		flex: 1,
		paddingTop: OS == 'android' ? 15 : 0,
		flexDirection: 'column'
	},
	container: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	},
	transparent: {
		backgroundColor: 'transparent'
	},
	bar: {
		height: BAR_HEIGHT,
		width: SCREEN_WIDTH,
		justifyContent: 'center',
		alignItems: 'center'
	},

	barText: {
		color: WHITE,
		fontSize: MEDIUM - 5,
		fontWeight: 'bold'
	},
	opacityFill: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: BLACK,
		opacity: FADE
	},
	questionAuthor: {
		color: 'white',
		alignSelf: 'flex-start',
		marginLeft: 25,
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 5
	}
});
mapStateToProps = ({ session }) => {
	return { code: session.code, room: session.room, theme: session.theme };
};

export default connect(mapStateToProps)(SpeakerScreen);
