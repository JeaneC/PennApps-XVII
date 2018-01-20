import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import '../App.css';
import { Link } from 'react-router'

class Presentation extends Component {

    render() {
        return (
            <Col xs={12} md={2}>
                <Row>
                    <Col xs={12}><Link to="/">Home</Link></Col>
                    <Col xs={12}><Link to="/about">About</Link></Col>
                    <Col xs={12}><Link to="/present">Presentation</Link></Col>
                </Row>
            </Col>
        );
    }
}

export default Presentation;
