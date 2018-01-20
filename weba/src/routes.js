import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SigninScreen from './routes/SigninScreen';
import Presentation from './routes/Presentation';
import Notepad from './routes/Notepad';
// import Home from './components/Home'
// import About from './components/About';

const Main = () => (
	<main>
		<Switch>
			<Route path="/" component={SigninScreen} exact />
			<Route path="/present" component={Presentation} exact />
			<Route path="/edit" component={Notepad} exact />
		</Switch>
	</main>
);
const App = (
	<div>
		<BrowserRouter />
	</div>
);

export default App;
