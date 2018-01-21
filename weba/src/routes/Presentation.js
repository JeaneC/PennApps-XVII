import React, { Component } from 'react';
import styled from 'styled-components';

import webABG from '../assets/webABG.png';
import menu from '../assets/menu.png';
import presentation from '../assets/presentation.png';
import edit from '../assets/edit.png';
import folder from '../assets/folder.png';
import logout from '../assets/logout.png';
import { firebase, database, admin } from '../firebase/firebase';
import Iframe from 'react-iframe';
import Dashboard from '../components/Dashboard';

import { connect } from 'react-redux';

const pptId =
	'https://docs.google.com/presentation/d/e/2PACX-1vQMWeVYHk5NjwNqLjM-wcxqQK8qcVhdi53wprdAIl7Mqy7Xx1je9JdaaOn7RUMHK0jrejPLPqJDxibX/embed?start=false&loop=false&delayms=3000';
const Container = styled.div`
	display: flex;
	flex: 1;
	background: linear-gradient(#502764, #252323);
	height: 100vh;
	justify-content: center;
	align-items: center;
`;

const pptId2 =
	'https://docs.google.com/presentation/d/e/2PACX-1vSamwUlg7Qcnd8EIpGyzeY6ebeU4CFMUUvEXPWjgjPF9K_5rAokHdnnSxsGiqHzvuW2yTbgZexPezmJ/embed?start=false&loop=false&delayms=3000';

const Body = styled.div`
	flex: 12;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
//#6E3667
//#f8eee7
const Icon = styled.img`
	width: 50px;
`;

const Box = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Box2 = styled.div`
	flex: 1;
	margin-top: 10px;
	margin-bottom: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Box3 = styled.div`
	flex: 1;
	margin-bottom: 10px;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

const HR = styled.div`
	background: white;
	height: 1px;
	width: 80%;
`;

const BigGap = styled.div`
	flex: 3;
`;

const SmallGap = styled.div`
	flex: 0.5;
`;

const Frame = styled.iframe`
	background: white;
	width: 100%;
`;

const Transcript = styled.div`
	width: 45%;
	height: 100vh;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const BubbleContainer = styled.div`
	width: 90%;
	min-height: 110px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-top: 40px;
	margin-bottom: 0px;
	overflow: auto;
`;

const TextCaption = styled.div`
	margin-left: 5px;
	margin-bottom: 10px;
	color: white;
	flex: 1;
`;

const Bubble = styled.div`
	width: 100%;
	border-radius: 15px;
	background-color: #f8eee7;
	flex: 1;
	justify-content: center;
	overflow: auto;
	align-items: center;
`;

const BubbleText = styled.p`
	font-size: 12px;
	font-weight: 400;
	padding-right: 10px;
	padding-left: 10px;
	text-align: justify;
`;
//#f8eee7
class Presentation extends Component {
	state = {
		chatList: []
	};

	constructor(props) {
		super(props);
		this.state = {
			chatList: [],
			firstItem: true
		};
		this.addBubble = this.addBubble.bind(this);
	}

	addBubble(bubbleObj) {
		const bubbleObjects = [...this.state.chatList, bubbleObj];
		this.setState({ chatList: bubbleObjects });
	}

	componentDidMount() {
		console.log('mounted presnetation');

		firebase
			.auth()
			.signInAnonymously()
			.catch(function(error) {
				let errorCode = error.code;
				let errorMessage = error.message;
				console.log('Error ' + errorCode + ': ' + errorMessage);
			});
		let transcriptRef = database.ref('Classes/67445/Transcript');
		transcriptRef.on('value', snapshot => {
			console.log(this.state.firstItem);
			if (!this.state.firstItem) {
				let lastAdded = snapshot.val()[
					Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 1]
				];
				console.log(lastAdded);
				console.log('see above');
				this.addBubble({
					Timestamp: lastAdded.Timestamp,
					Slide: lastAdded.Slide,
					Text: lastAdded.Text
				});
			} else {
				this.setState({ firstItem: false });
				console.log(snapshot.val());
				for (let key in snapshot.val()) {
					if (!snapshot.val().hasOwnProperty(key)) continue;
					let obj = snapshot.val()[key];
					this.addBubble(obj);
				}
			}
		});
	}

	render() {
		return (
			<Container>
				<Dashboard />
				<Body>
					<Frame
						src={pptId2}
						width="50%"
						height="100%"
						frameBorder="0"
						allowtransparency="true"
						style={{ backgroundColor: 'white' }}
					/>
					<Transcript>
						{this.state.chatList.map((bubble, i) => {
							return (
								<BubbleContainer key={i}>
									<TextCaption>
										{bubble.Timestamp} - Slide {bubble.Slide}
									</TextCaption>
									<Bubble>
										<BubbleText>{bubble.Text}</BubbleText>
									</Bubble>
								</BubbleContainer>
							);
						})}
					</Transcript>
				</Body>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	console.log('Presentation', state);
	return {};
};

export default connect(mapStateToProps)(Presentation);
