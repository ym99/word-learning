import React, { Component } from 'react';
import { History } from 'History';

export class App extends Component  {
    constructor(props){
        super(props);

        this.state = {
            question: {
                question: "q?",
                correctAnswer: "ca?"
            },
            history: [ 
                { 
                    question: "q1",
                    answer: "a1",
                    correctAnswer: "ca1"
                }, {
                    question: "q2",
                    answer: "a2",
                    correctAnswer: "ca2"
                }, {
                    question: "q3",
                    answer: "a3",
                    correctAnswer: "ca3"
                }
            ]
        };
    }

    render(){
        return (
            <History 
                question={this.state.question}
                history={this.state.history}
            />
        );
    }
}