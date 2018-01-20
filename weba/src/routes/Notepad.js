import React, {Component} from 'react';
import '../App.css';
import './stylesheets/Presentation.css'
import Transcript from "./Transcript";
import Dashboard from "../components/Dashboard";

class Notepad extends Component {
    render() {
        return (
            <Container>
                <Dashboard/>
                <div>
                    <div style={{display: "flex", fontFamily: "Helvetica"}}>
                        <div style={{flex: 1}}>
                            <p>Hi</p>
                        </div>
                        <div style={{flex: 5}}>
                            <div className="headerText">
                                <div className="headerInsideDiv">
                                    Notes
                                </div>
                            </div>
                            <textarea className="bodyHeight" style={{width: "99.5%"}}>
                        </textarea>
                        </div>
                        <Transcript></Transcript>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Notepad;
