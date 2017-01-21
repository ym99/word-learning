import React, { Component } from 'react';
import { Record } from 'Record';

export class History extends Component  {
    render(){
        return (
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th class="col-md-3">Number</th>
                        <th class="col-md-3">Question</th>
                        <th class="col-md-3">Answer</th>
                        <th class="col-md-3">Correct Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.history.map(function(obj, index) {
                        return (<Record index={index} record={obj}/>);
                    })}
                </tbody>
            </table>
        );
    }
}
