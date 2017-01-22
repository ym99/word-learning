import React, { Component } from 'react';

export class Answer extends Component  {
    constructor(props){
        super(props);

        this.state = {
            isError: false,
            value: ""
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.inputObj.focus(); 
    }

    handleKeyDown(event) {
        this.setState({
            isError: false
        });

        return true;
    }

    handleKeyPress(event) {
        if (event.keyCode === 13) {
            this.props.processAnswer();
            return false;
        }

        return true;
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        })
    }

    render(){
        const style = this.state.isError ? {
            backgroundColor: 'rgb(242, 222, 222)',
            outlineCcolor: 'darkred'
        } : {};

        return (
            <input 
                type='text'
                ref={(x) => { this.inputObj = x; }} 
                onKeyDown={this.handleKeyDown}
                onKeyPress={this.handleKeyPress}
                onChange={this.handleChange}
                style={style}
                value={this.state.value}
            >
            </input>
        );
    }
}