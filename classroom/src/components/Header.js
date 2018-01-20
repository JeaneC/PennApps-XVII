import React, {Component} from 'react';
import logo from '../logo.svg';
import {Grid, Row, Col} from 'react-flexbox-grid';
import '../App.css';

class Header extends Component {
    render() {
        return (
                <Row>
                    <Col xs={12}>
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h1 className="App-title">Welcome to React</h1>
                        </header>
                    </Col>
                </Row>
        );
    }
}

export default Header;
