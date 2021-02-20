import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../styles/style.css'

class ResultComponent extends Component{
        constructor (props) {
            super(props);
            this.state = {
                score: 0,
                type: '',
                numberOfQuestions: 0,
                numberOfAnsweredQuestions: 0,
                correctAnswers: 0,
                wrongAnswers: 0
            };
        }

        componentDidMount () {
            const { state} = this.props.location; 
            this.setState({
                score: (state.score / state.numberOfQuestions) *100,
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers
                
            });
        }    
    render(){
        const {state,score } = this.props.location;
        let stats, remark;
        if (this.state.score.toFixed(0) <= 30) {
            remark = 'You need more practice';
        } else if (this.state.score.toFixed(0) > 30 && this.state.score.toFixed(0) <= 50) {
            remark = 'Better luck next time';
        } else if (this.state.score.toFixed(0) <= 70 && this.state.score.toFixed(0) > 50) {
            remark = 'You can do better';
        } else if (this.state.score.toFixed(0) >= 71 && this.state.score.toFixed(0) <= 84) {
            remark = 'You did great!'
        } else {
            remark = 'You\'re an absolute genius!'
        }
        
        return(
            <Fragment>
            <Helmet><title>Quiz Summary - Instaquiz</title></Helmet>
            <div className="tick-icon">
                <span className="mdi mdi-check-circle-outline mdi-lg success-icon"></span>  
            </div>
            <h1 className="tick-icon">Result</h1>
            <div className="container stats">
                <h4>{ remark }</h4>
                <h2 className="perfect-score">Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                <span className="stat left">Total Number of Questions :
                    </span><span className="right">{this.state.numberOfQuestions}</span><br />
                <span className="stat left">Number of attempted questions :
                    </span><span className="right">{this.state.numberOfAnsweredQuestions}</span><br />
                <span className="stat left">Number of Correct Answers : 
                    </span><span className="right">{this.state.correctAnswers}</span><br />
                <span className="stat left">Number of Wrong Answers :
                    </span><span className="right">{this.state.wrongAnswers}</span><br />
            </div>
            <section>
                <ul>
                    <li><Link to="/play/quiz" className= "playagainbtn" id="summary">Play Again</Link></li>
                    <li><Link to="/" className= "backbtn" id="summary">Back to Home</Link></li>
                </ul>
            </section>
        </Fragment>
        );
        }
    }


export default ResultComponent;