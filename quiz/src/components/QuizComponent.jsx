import React, { Component } from 'react'
import './Component.css';
export default class QuizComponent extends Component {
    render() {
        return (
            <div>
               <div className="quiz">
                   <div className="qs">
                   <h1>Question</h1>
                   <p>which is the mammal which can't jump ?</p>
                   <div className="answer">
                       <button className='option'>dog</button>
                       <button className='option'>goat</button>
                     
                   </div><br/>
                   <div className="answer">
                      <button className='option'>elephant</button>
                       <button className='option'>lion</button>
                   </div>
                   <br/>
                   <div className="b0">
                   <button className="b1"> previous</button>
                   <button className="b2">next</button>
                   <button className="b3">quit</button>
                   </div>
                  
                   </div>
                   </div> 
            </div>
        )
    }
}