import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import SigninScreen from './routes/SigninScreen';
import DashboardScreen from './routes/Home';
import Presentation from './routes/Presentation';
import Notepad from './routes/Notepad';
import Visualization from './routes/Visualization';
import Resources from './routes/Resources';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore(); //This returns the store

const routes = (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={SigninScreen} exact />
			<Route path="/dashboard" component={DashboardScreen} exact />
			<Route path="/present" component={Presentation} />
			<Route path="/edit" component={Notepad} />
			<Route path="/visualize" component={Visualization} />
            <Route path="/resources" component={Resources} />
        </Router>
	</Provider>
);

export default routes;
