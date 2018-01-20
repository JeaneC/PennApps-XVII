import React, { Component } from 'react';
import styled from 'styled-components';

import webABG from '../assets/webABG.png';
import menu from '../assets/menu.png';
import presentation from '../assets/presentation.png';
import edit from '../assets/edit.png';
import folder from '../assets/folder.png';
import logout from '../assets/logout.png';
import { firebase, database } from '../firebase/firebase';
import Iframe from 'react-iframe';

const pptId =
	'https://docs.google.com/presentation/d/e/2PACX-1vQMWeVYHk5NjwNqLjM-wcxqQK8qcVhdi53wprdAIl7Mqy7Xx1je9JdaaOn7RUMHK0jrejPLPqJDxibX/embed?start=false&loop=false&delayms=3000';
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
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #6e3667;
	justify-content: space-between;
	align-items: center;
`;
const Body = styled.div`
	flex: 12;
	height: 100vh;
	background-color: #f8eee7;
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
`;

const Transcript = styled.div`
	background-color: #94618e;
	width: 45%;
	height: 90vh;
`;

class Dashboard extends Component {
	render() {
		return (
			<NavBar>
				<Box>
					<Icon src={menu} />
				</Box>
				<HR />
				<Box2>
					<Icon src={presentation} />
				</Box2>
				<Box3>
					<Icon src={edit} />
				</Box3>
				<HR />
				<Box2>
					<Icon src={folder} />
				</Box2>
				<BigGap />
				<Box>
					<Icon src={logout} />
				</Box>
			</NavBar>
		);
	}
}

export default Dashboard;
