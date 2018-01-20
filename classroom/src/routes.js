import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import Presentation from './components/Presentation'
import Home from './components/Home'
import About from './components/About'
import Sidebar from './components/Sidebar'

const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={Home} />
        <Route path="/">
            <Route path="present" component={Presentation} />
            <Route path="about" component={About} />
        </Route>
    </Router>
);

export default routes
