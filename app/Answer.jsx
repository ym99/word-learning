import React, { Component } from 'react';

export class Answer extends Component  {
    constructor(props){
        super(props);

        this.state = {
            isError: false,
            value: ""
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.inputObj.focus(); 
    }

    handleKeyPress(event) {
        if (event.keyCode === 13) {
            this.props.processAnswer();
            return false;
        }

        return true;
    }

    handleChange(event){
        const value = event.target.value;

        const isError = !value.match(/^[ A-Za-z]*$/);

        this.setState({
            isError: isError,
            value: event.target.value
        })
    }

    render(){
        const style = this.state.isError ? {
            backgroundColor: 'rgb(242, 222, 222)',
            outlineColor: 'darkred'
        } : {};

        return (
            <input 
                type='text'
                ref={(x) => { this.inputObj = x; }} 
                onKeyPress={this.handleKeyPress}
                onChange={this.handleChange}
                style={style}
                value={this.state.value}
            >
            </input>
        );
    }
}