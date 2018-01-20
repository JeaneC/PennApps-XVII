import React, {Component} from 'react';
import '../App.css';
import './stylesheets/Presentation.css'
import record from 'node-record-lpcm16';
import Speech from '@google-cloud/speech'

class Presentation extends Component {

    constructor(props) {
        super(props);
        this.speech = Speech();
        const encoding = 'LINEAR16';
        const sampleRateHertz = 16000;
        const languageCode = 'en-US';
        this.request = {
            config: {
                encoding,
                sampleRateHertz,
                languageCode,
            },
            interimResults: false // If you want interim results, set this to true
        };
        this.recognizeStream = this.speech.streamingRecognize(this.request)
            .on('error', console.error)
            .on('data', (data) => {
                if (data.results[0] && data.results[0].alternatives[0]) {
                    const rawText = data.results[0].alternatives[0].transcript;
                    console.log(
                        data.results[0] && data.results[0].alternatives[0]
                            ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
                            : `\n\nReached transcription time limit, press Ctrl+C\n`
                    )
                }
            });
    }

    startRecording() {
        console.log('starting recording');
        // Start recording and send the microphone input to the Speech API
        record
            .start({
                sampleRateHertz: 1600,
                threshold: 0,
                // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
                verbose: false,
                recordProgram: 'rec' // Try also "arecord" or "sox"
            })
            .on('error', console.error)
            .pipe(this.recognizeStream);
        return;
    };

    stopRecording() {
        console.log('stopping recording');
        record.stop();
    }

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
