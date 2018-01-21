import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import SigninScreen from './routes/SigninScreen';
import Presentation from './routes/Presentation';
import Notepad from './routes/Notepad';
import Visualization from './routes/Visualization';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore(); //This returns the store

const routes = (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={SigninScreen} />
			<Route path="/present" component={Presentation} />
			<Route path="/edit" component={Notepad} />
			<Route path="/visualize" component={Visualization} />
		</Router>
	</Provider>
);

export default routes;
