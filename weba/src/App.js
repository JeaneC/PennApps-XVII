import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SigninScreen from './routes/SigninScreen';
import Dashboard from './routes/Dashboard';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Dashboard />
			</div>
		);
	}
}

export default App;
