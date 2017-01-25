import React, { Component } from 'react';

export class Progress extends Component {
    render(){
        const total = this.props.history.length + this.props.questions.length;

        let records = [];
        this.props.history.forEach((record) => {
            if (records.length === 0 || records[records.length - 1].isCorrectAnswer !== record.isCorrectAnswer) {
                records.push({
                    isCorrectAnswer: record.isCorrectAnswer,
                    count: 1
                });
            } else {
                records[records.length - 1].count++;
            }
        });

        return (
            <div className={"progress"}>
                {records.map((record, index) => {
                    return (
                        <div 
                            key={index}
                            className={record.isCorrectAnswer ? "progress-bar progress-bar-success" : "progress-bar progress-bar-danger"} 
                            role={"progressbar"}
                            style={({width: (record.count / total * 100).toFixed(0) + "%" })}>
                        </div>
                    );
                })}
            </div>            
        );
    }
}
