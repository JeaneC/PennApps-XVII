import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SigninScreen from './routes/SigninScreen';
import Presentation from './routes/Presentation';
import Notepad from './routes/Notepad';
import Router from './routes';

class App extends Component {
	render() {
		return (
			<div className="App">
				<SigninScreen />
			</div>
		);
	}
}

export default App;
