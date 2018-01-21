import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import SigninScreen from './routes/SigninScreen';
import Presentation from './routes/Presentation';
import Notepad from './routes/Notepad';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={SigninScreen} />
		<Route path="/present" component={Presentation} />
		<Route path="/edit" component={Notepad} />
	</Router>
);

export default routes
