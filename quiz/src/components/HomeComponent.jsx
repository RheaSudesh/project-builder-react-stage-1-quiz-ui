// import { textareaAutoResize } from 'materialize-css'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import '../styles/style.css'
// import QuizComponent from './QuizComponent'


export default class HomeComponent extends Component {
    render() {
        return (
            <div className="home">
                <Helmet><title>Quiz - Home</title></Helmet>
                <center>
                <h1>Quiz App</h1>
                <div>
                    <button className="play" ><Link to="/play/quiz" >Play</Link></button> 
                </div>
                </center>
            </div>
        )
    }
}