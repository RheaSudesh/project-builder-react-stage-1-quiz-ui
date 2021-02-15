import React, { Component } from 'react'
import './Component.css'
import './QuizComponent'
export default class HomeComponent extends Component {
    render() {
        return (
            <div className="home">
                <h1>Quiz App</h1>
                <div>
                    <button className="play">Play</button>
                </div>
            </div>
        )
    }
}