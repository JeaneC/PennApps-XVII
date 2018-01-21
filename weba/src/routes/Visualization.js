import React, {Component} from 'react';
import styled from 'styled-components';

import menu from '../assets/menu.png';
import presentation from '../assets/presentation.png';
import edit from '../assets/edit.png';
import folder from '../assets/folder.png';
import logout from '../assets/logout.png';
import Iframe from 'react-iframe';
import {firebase, database} from '../firebase/firebase';
import Dashboard from '../components/Dashboard';
import {render} from 'react-dom';
import {Chart} from 'react-google-charts';

import {connect} from 'react-redux';

const pptId =
    'https://docs.google.com/presentation/d/e/2PACX-1vQMWeVYHk5NjwNqLjM-wcxqQK8qcVhdi53wprdAIl7Mqy7Xx1je9JdaaOn7RUMHK0jrejPLPqJDxibX/embed?start=false&loop=false&delayms=3000';
const Container = styled.div`
	display: flex;
	flex: 1;
	background: linear-gradient(#502764, #a07777);
	height: 100vh;
	justify-content: center;
	align-items: center;
`;

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
`;

const TextCaption = styled.div`
	margin-left: 5px;
	margin-bottom: 10px;
	color: white;
	flex: 1;
`;

const Bubble = styled.div`
	height: 80px;
	width: 100%;
	border-radius: 15px;
	background-color: #f8eee7;
	flex: 1;
	justify-content: center;
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
class Visualization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            lineData: [['Slide', 'Forward', 'Louder', 'ThumbUp', 'ThumbDown', 'Lower', 'Rewind']],
            emotionNames: ["Not enough data"],
            emotionStats: {},
            sentimentStats: {}
        };
        this.frequency = (array, word) => {
            let count = 0;
            for (let i = 0; i < array.length; i++) {
                if (word === array[i].replace(/[0-9]/g, '')) count++;
            }
            return count;
        }
    }

    componentWillMount() {
        firebase
            .auth()
            .signInAnonymously()
            .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log('Error ' + errorCode + ': ' + errorMessage);
            });
        // let userId = firebase.auth().currentUser.uid;
        return database.ref('Classes/67445/FeedbackEnhanced').once('value').then(snapshot => {
            let feedbackStrings = [];
            let lineArray = this.state.lineData;
            for (let key in snapshot.val()) {
                if (!snapshot.val().hasOwnProperty(key)) continue;
                let feedbackString = snapshot.val()[key];
                feedbackStrings.push(feedbackString);
                let slideNum = feedbackString.replace(/\D/g, '');
                let feedbackName = feedbackString.replace(/[0-9]/g, '');
                let found = false;
                for (let i = 1; i < lineArray.length; i++) {
                    if (lineArray[i][0] === slideNum) {
                        switch (feedbackName) {
                            case "Forward":
                                lineArray[i][1] += 1;
                                break;
                            case "Louder":
                                lineArray[i][2] += 1;
                                break;
                            case "ThumbUp":
                                lineArray[i][3] += 1;
                                break;
                            case "ThumbDown":
                                lineArray[i][4] += 1;
                                break;
                            case "Lower":
                                lineArray[i][5] += 1;
                                break;
                            case "Rewind":
                                lineArray[i][6] += 1;
                                break;
                        }
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    for (let i = 1; i < lineArray.length; i++) {
                        if (slideNum <= lineArray[i][0]) {
                            lineArray.splice(i, 0, [slideNum, 0, 0, 0, 0, 0, 0]);
                            found = true;
                            break;
                        }
                    }
                    if (!found) lineArray.push([slideNum, 0, 0, 0, 0, 0, 0]);
                }
                // ['Slide', 'Forward', 'Louder', 'ThumbUp', 'ThumbDown', 'Lower', 'Rewind']
            }
            this.setState({data: feedbackStrings});
            this.setState({lineData: lineArray});
            let emotionNamesArr = [];
            database.ref('Classes/67445/Emotion').once('value').then(emotionSnapshot => {
                let emotionStatArr = [["Emotion", "Strength (0 min, 100 max)", {role: 'style'}]];
                for (let key in emotionSnapshot.val()) {
                    if (!emotionSnapshot.val().hasOwnProperty(key)) continue;
                    if (key !== "Overall") {
                        let color = "gray";
                        if (key === "Angry") color = "red";
                        if (key === "Sad") color = "blue";
                        if (key === "Happy" || key === "Excited") color = "green";
                        emotionStatArr.push([key, 100 * emotionSnapshot.val()[key], color]);
                    }
                    else {
                        emotionNamesArr.push(emotionSnapshot.val()[key]);
                    }
                }
                this.setState({emotionStats: emotionStatArr});
            });
            database.ref('Classes/67445/Sentiment').once('value').then(sentimentSnapshot => {
                let sentimentStatArr = [["Sentiment", "Strength (0 min, 100 max)", {role: 'style'}]];
                for (let key in sentimentSnapshot.val()) {
                    if (!sentimentSnapshot.val().hasOwnProperty(key)) continue;
                    if (key !== "Overall") {
                        let color = "gray";
                        if (key === "Negative") color = "red";
                        if (key === "Positive") color = "green";
                        sentimentStatArr.push([key, 100 * sentimentSnapshot.val()[key], color]);
                    }
                    else {
                        emotionNamesArr.push(sentimentSnapshot.val()[key]);
                    }
                }
                this.setState({sentimentStats: sentimentStatArr});
                this.setState({emotionNames: emotionNamesArr})
            });
        });
    }

    render() {
        return (
            <Container>
                <Dashboard />
                <Body style={{width:"100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.25)"}}>
                <div>
                    <Chart
                        chartType="PieChart"
                        data={[
                            ['Feedback', 'Frequency'],
                            ['Forward', this.frequency(this.state.data, "Forward")],
                            ['Louder', this.frequency(this.state.data, "Louder")],
                            ['ThumbUp', this.frequency(this.state.data, "ThumbUp")],
                            ['ThumbDown', this.frequency(this.state.data, "ThumbDown")],
                            ['Lower', this.frequency(this.state.data, "Lower")],
                            ['Rewind', this.frequency(this.state.data, "Rewind")]
                        ]}
                        options={{backgroundColor: {fill: 'transparent'}, title: "Frequency of feedback signals"}}
                        graph_id="PieChart"
                        width="500px"
                        height="400px"
                        legend_toggle
                    />

                    <Chart
                        chartType="LineChart"
                        data={this.state.lineData}
                        options={{backgroundColor: {fill: 'transparent'}, title: "Feedback received during each slide"}}
                        graph_id="LineChart"
                        width="600px"
                        height="400px"
                        legend_toggle
                    />
                </div>
                {/*<h3>Overall emotions during presentation: {this.state.emotionNames.join(', ')}</h3>*/}
                <div>
                    <Chart
                        chartType="BarChart"
                        data={this.state.emotionStats}
                        options={{backgroundColor: {fill: 'transparent'}, legend: "none", title: "Strength of Emotions During Presentation (0-100)"}}
                        graph_id="EmotionBar"
                        width="500px"
                        height="400px"
                    />
                    <Chart
                        chartType="BarChart"
                        data={this.state.sentimentStats}
                        options={{backgroundColor: {fill: 'transparent'}, legend: "none", title: "Strength of Sentiment During Presentation (0-100)"}}
                        graph_id="SentimentBar"
                        width="500px"
                        height="400px"
                    />
                </div>
                </Body>
            </Container>
        );
    }
}

// const mapStateToProps = state => {
//     console.log('Presentation', state);
//     return {};
// };

export default Visualization;
