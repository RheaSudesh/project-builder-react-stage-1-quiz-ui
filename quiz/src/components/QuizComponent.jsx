// import { render } from '@testing-library/react';
import React, { Component, Fragment } from 'react';
import {Helmet} from 'react-helmet'; //title and metadata
import '@mdi/font/css/materialdesignicons.css';  //icons
import '../styles/style.css'; //styling
import M from 'materialize-css';
import question from '../questions.json';  //JSON file for questions
import isEmpty from '../Functionalities/isEmpty'; 
// import ResultComponent from './ResultComponent';


class QuizComponent extends Component{
    constructor(props){
        super(props);
        this.state = {

            //questions
            type: '',
            questions: question, 
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',

            //questions details
            numberOfQuestions: question.length,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,

            //results
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,

            //enablers
            loading: false,
            previousButtonDisabled: false,
            nextButtonDisabled: false,

            //timer
            time: {}
        };

        this.interval=null; //initial time interval is null
        
    }


    displayQuestion (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(this.state.questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer =  currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                answer,
               
            });
        }
    };
    handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            setTimeout(() => {
                this.correctAnswer();
            }, 500);
        } else {
            
            setTimeout(() => {
                this.wrongAnswer();
            }, 500);
        }

        if (this.state.numberOfQuestions === 0) {
            const questionsArray = Object.keys(this.state.questions).map(i => this.state.questions[i]);
            this.setState({
                numberOfQuestions: questionsArray.length
            });
        }
    }

    //invoked immediately after this component is mounted
    componentDidMount () {
        const {questions,currentQuestion, nextQuestion, previousQuestion}=this.state;
        this.displayQuestion(questions, currentQuestion,nextQuestion,previousQuestion);
        this.startTimer();
        
    }

    //invoked immediately after a component is removed or after timeout
    componentWillUnmount () {
        clearInterval(this.interval);
    }

  
    endGame = () => {
        alert('Quiz has ended!');
        const quizData = {
            score: this.state.score,
            type: this.state.type,
            numberOfQuestions: this.state.numberOfQuestions,
            numberOfAnsweredQuestions: this.state.numberOfAnsweredQuestions,
            correctAnswers: this.state.correctAnswers,
            wrongAnswers: this.state.wrongAnswers,
        };
        console.log(quizData);
        setTimeout(()=>{
            this.props.history.push('/play/quizSummary', quizData);
        }, 1000);
        
    }

    //correct bubble UI element displayed
    correctAnswer = () => {
        M.toast({
            html: 'Correct Answer!',
            classes: 'toast-valid',
            displayLength: 1500
        });
        this.setState((prevState) => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    }

    //wrong bubble UI element displayed
    wrongAnswer = () => {
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState((prevState) => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    }

    //buttons for back next and quit
    handleNextButtonClick = (e) => {
        if (!this.state.nextButtonDisabled) {
            if (this.state.nextQuestion !== undefined) {
                this.setState((prevState) => ({
                    currentQuestionIndex: prevState.currentQuestionIndex + 1
                }), () => {
                    this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
                });
            }
        }
    };
    handlePrevButtonClick = (e) => {
        if (!this.state.previousButtonDisabled) {
            if (this.state.previousQuestion !== undefined) {
                this.setState((prevState) => ({
                    currentQuestionIndex: prevState.currentQuestionIndex - 1
                }), () => {
                    this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
                });
            }
        }
    }
    handleQuitButtonClick = (e) => {
        if (window.confirm ('Are you sure you want to quit?')) {
            this.endGame();
        }
    }

    // Timer of 3 mins to take up 15 questions
    startTimer = () => {
        
        const countDownTime = Date.now() + 180000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    ...this.state,
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endGame();
                });
            } else { 
                this.setState({ 
                    ...this.state,
                    time: {
                        seconds,
                        minutes,
                        distance
                    }
                });
            }
        }, 1000);
    }

  

    render() {
    const {currentQuestion, currentQuestionIndex, numberOfQuestions,time} =this.state;

        console.log(this.state.correctAnswers);
        return(
            <Fragment>
                <Helmet><title>Quiz - Play</title></Helmet>
            
            <div className="question">
                    <p> 
                        <span className="ques">{currentQuestionIndex + 1} of {numberOfQuestions }</span>
                        <span className="lifeline">{time.minutes}:{time.seconds}</span><span className="mdi mdi-clock-outline mdi-24px ques"></span>
                    </p>
                <h5> {currentQuestion.question} </h5>
                
                <div className="option-container">
                    <p onClick={this.handleOptionClick}  className="option">{currentQuestion.optionA}</p>
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                </div>
                <div className="option-container">
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                </div>
                
                <div className="buttonContainer">
                    <button onClick={this.handlePrevButtonClick}>Previous</button>
                    <button onClick={this.handleNextButtonClick}>Next</button>
                    <button onClick={this.handleQuitButtonClick}>Quit</button>
                </div>
            </div>
            </Fragment>
        );
    }

}
export default QuizComponent;