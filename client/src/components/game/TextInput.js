import React from "react";
import "../../css/game.css";

/*
props : handleInput(): updates state in parent by increasing the counter for corrent words
        currentWord: The word that should be typed currently
*/

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        };
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    updateInputValue(event) {

        let inpVal = event.target.value
        if (inpVal.substr(-1) == ' ' && this.props.currentWord == this.state.inputValue) {
            this.setState({ inputValue: '' });
            this.props.handleInput()
        } else {
            this.setState({
                inputValue: inpVal
            });
        }
    }


    render() {
        return (
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                    value={this.state.inputValue} onChange={event => this.updateInputValue(event)} />
                <div className="input-group-append">
                    <button type="button" className="btn btn-dark" onClick={this.props.handleInput}>@example.com</button>
                </div>
            </div>
        );
    }
}