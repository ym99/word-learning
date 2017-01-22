import React, { Component } from 'react';
import { Record } from 'Record';
import { Question } from 'Question';

export class History extends Component  {
    render(){
        return (
            <table
                className="table table-striped table-bordered"
                style={({textAlign: 'center'})}>
                <thead>
                    <tr>
                        <th className="col-md-3" style={({textAlign: 'center'})}>Number</th>
                        <th className="col-md-3" style={({textAlign: 'center'})}>Question</th>
                        <th className="col-md-3" style={({textAlign: 'center'})}>Answer</th>
                        <th className="col-md-3" style={({textAlign: 'center'})}>Correct Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.history.map(function(obj, index) {
                        return (<Record index={index + 1} record={obj}/>);
                    })}
                    <Question question={this.props.question} />
                </tbody>
            </table>
        );
    }
}
