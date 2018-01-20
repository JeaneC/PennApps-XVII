import React, { Component } from 'react';
import styled from 'styled-components';

import webABG from '../assets/webABG.png';
import { firebase, database } from '../firebase/firebase';
const Container = styled.div`
	display: flex;
	flex: 1;
	background-color: #f8eee7;
	height: 100vh;
	justify-content: center;
	align-items: center;
`;

const NavBar = styled.div`
	flex: 1;
	height: 100vh;
	background-color: #6e3667;
`;
const Body = styled.div`
	flex: 9;
	height: 100vh;
	background-color: #f8eee7;
`;
//#6E3667
//#f8eee7

class Dashboard extends Component {
	render() {
		return (
			<Container>
				<NavBar /> <Body />
			</Container>
		);
	}
}

export default Dashboard;
