import React, { Component } from 'react';
import { Answer } from 'Answer';

export class Question extends Component  {
    constructor(props){
        super(props);

        this.state ={
            isError: false            
        };
    }

    click(){
//        this.props.registerAnswer(this.);
    }

    render(){
        const style = this.state.isError ? {
            backgroundColor: 'rgb(242, 222, 222)',
            outlineCcolor: 'darkred'
        } : {};

        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.question.question}</td>
                <td>
                    <Answer />
                </td>
                <td>
                    <button
                        type='button'
                        onClick={this.click}
                    >
                        Check
                    </button>
                </td>
            </tr>
        );
    }
}