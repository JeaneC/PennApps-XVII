import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SigninScreen from './routes/SigninScreen';
import Presentation from './routes/Presentation';
import Notepad from './routes/Notepad';
import Router from './routes';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore(); //This returns the store

class App extends Component {
	render() {
		return <Router />;
	}
}

export default App;
