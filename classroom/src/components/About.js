import React, {Component} from 'react';
import logo from '../logo.svg';
import {Grid, Row, Col} from 'react-flexbox-grid';
import '../App.css';
import Header from './Header'
import Sidebar from './Sidebar'


class About extends Component {

    render() {
        return (
            <Grid fluid className="App">
                <Header />
                <Row>
                    <Sidebar />
                    <Col xs={12} md={10}>
                        About our site
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default About;
