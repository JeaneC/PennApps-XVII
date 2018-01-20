import React, { Component } from 'react';
import styled from 'styled-components';

import webABG from '../assets/webABG.png';

const Container = styled.div`
	display: flex;
	flex: 1;
	background-color: #6e3667;
	height: 100vh;
	justify-content: center;
	align-items: center;
`;

const SigninBox = styled.div`
	width: 80%;
	border-radius: 30px;
	height: 80vh;
	display: flex;
`;

const Left = styled.div`
	flex: 1;
	background-color: blue;
	border-radius: 30px 0 0 30px;
`;

const Right = styled.div`
  display: flex;
	flex: 1;
	flex-direction: column;
	border-radius: 0 30px 30px 0;
  justify-content: : center;
  align-items: center;
  background-color: #94618E;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
`;

const Header = styled.div`
	flex: 1.4;
	display: flex;
	font-family: Helvetica Neue;
	align-items: center;
	justify-content: center;
	font-size: 80px;
	color: white;
	width: 100%;
`;

const Form = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 2.1;
	width: 65%;
	padding-top: 30px;
	border-radius: 5px 5px 5px 5px;
	background-color: #f8eee7;
	box-shadow: 1px 1px black;
`;

const Footer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex: 1.4;
	width: 65%;
	border-radius: 0 0 30px 0;
`;

const Button1 = styled.input`
	display: flex;
	outline: none !important;
	border-width: 0;
	color: white;
	font-weight: bold;
	font-size: 14px;
	justify-content: center;
	align-items: center;
	width: 47%;
	height: 60px;
	background: #6e3667;
	border-radius: 10px 10px 10px 10px;
	box-shadow: 0 1px #999;

	&:active {
		background-color: #6e3667;
		box-shadow: 0 1px #666;
		transform: translateY(4px);
	}
`;
const Button2 = styled.div`
	display: flex;
	outline: none !important;
	border-width: 0;
	color: white;
	font-weight: bold;
	font-size: 14px;
	justify-content: center;
	align-items: center;
	width: 47%;
	height: 60px;
	background: #f8eee7;
	border-radius: 10px 10px 10px 10px;
	box-shadow: 0 2px #999;

	&:active {
		background-color: #f8eee7;
		box-shadow: 0 2px #666;
		transform: translateY(4px);
	}
`;

const FormLabel = styled.div`
	color: #574f45;
	width: 100%;
	flex: 1;
	font-weight: bold;
	padding-left: 30px;
	text-align: left;
	font-size: 14px;
`;

const FormInput = styled.input`
	outline: none;
	flex: 2;
	padding-left: 20px;
	margin-bottom: 5px;
	border: 0;
	font-size: 14px;
	width: 90%;
	background-color: #f8eee7;
`;

const ButtonText = styled.input`
	color: white;
	font-size: 14px;
	font-weight: bold;
`;

const ButtonText2 = styled.div`
	color: #6e3667;
	font-size: 14px;
	font-weight: bold;
`;

class SigninScreen extends Component {
	render() {
		return (
			<Container>
				<SigninBox>
					<Left>
						<Image src={webABG} />
					</Left>
					<Right>
						<Header>Classroom</Header>
						<Form>
							<FormLabel>Email Address</FormLabel>
							<FormInput type="text" placeholder="johnny@appleseed.com" />
							<FormLabel>Password</FormLabel>
							<FormInput type="password" placeholder="password" />
							<FormLabel>Classroom Code</FormLabel>
							<FormInput type="text" placeholder="12345" />
						</Form>
						<Footer>
							<Button1 type="button" value="Login" />
							<Button2>
								<ButtonText2>Sign-Up</ButtonText2>
							</Button2>
						</Footer>
					</Right>
				</SigninBox>
			</Container>
		);
	}
}

export default SigninScreen;
