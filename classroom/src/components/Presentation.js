import React, {Component} from 'react';
import logo from '../logo.svg';
import axios from 'axios'
import '../App.css';
import './stylesheets/Presentation.css'

class Presentation extends Component {

    render() {
        return (
            <div>
                <div style={{display: "flex", fontFamily: "Helvetica"}}>
                    <div style={{flex: 1}}>
                        <p>Hi</p>
                    </div>
                    <div style={{flex: 7}}>
                        <div className="headerText">
                            <div className="headerInsideDiv">
                                Cracking the Coding Interview
                            </div>
                        </div>
                        <iframe className="bodyHeight" id="iframe" ref="iframe"
                                src="https://docs.google.com/presentation/d/e/2PACX-1vQMWeVYHk5NjwNqLjM-wcxqQK8qcVhdi53wprdAIl7Mqy7Xx1je9JdaaOn7RUMHK0jrejPLPqJDxibX/embed?start=false&loop=false&delayms=3000"
                                frameBorder="0" width="100%" allowFullscreen="true"
                                mozallowfullscreen="true"
                                webkitallowfullscreen="true"></iframe>
                    </div>
                    <div style={{flex: 4, marginLeft: "10px"}}>
                        <div className="headerText">
                            <div style={{paddingTop: "40px", fontSize: "60px"}}>
                                Transcript
                            </div>
                        </div>
                        <div className="bodyHeight" style={{
                            backgroundColor: "rgb(148, 97, 142)",
                            borderRadius: "0 0 15px 15px",
                            color: "white",
                            fontSize: "25px",
                            overflowY: "auto"
                        }}>
                            <div className="transcriptBody">
                                <div className="transcriptTime">
                                    1:15 PM
                                </div>
                                <div className="transcriptEntry">
                                    Transcript Transcript Transcript Transcript Transcript Transcript Transcript
                                    Transcript
                                    Transcript
                                </div>
                            </div>
                            <div style={{display: "flex"}}>
                                <div className="transcriptTime">
                                    1:17 PM
                                </div>
                                <div className="transcriptEntry">
                                    Transcript Transcript Transcript Transcript Transcript Transcript Transcript
                                    Transcript
                                    Transcript
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Presentation;
