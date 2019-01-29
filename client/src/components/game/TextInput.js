import React from "react";
import "../../css/game.css";

/*
props : handleInput(): updates state in parent by increasing the counter for corrent words
        currentWord: The word that should be typed currently
        updateTypedWord()
*/

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            color: null,
            indexOfError : -1,
            lastDisabled : true,
        };
        this.updateInputValue = this.updateInputValue.bind(this);
        this.textInput = React.createRef();
    }

    updateInputValue(event) {

        let inpVal = event.target.value

        if ((inpVal.substr(-1) == ' '  && this.props.currentWord === this.state.inputValue) ||
                 (this.props.lastword && this.props.currentWord === inpVal)) {
            this.setState({ inputValue: '',
                            color: null,
                            indexOfError : -1 });
            inpVal = ''
            this.props.handleInput()
        } else {
            let errIndex = -1;
            for(let index = 0; index < inpVal.length; index++){
                if (inpVal[index] !== this.props.currentWord[index]){
                    this.setState({
                        color: {backgroundColor : "#FF5733"},
                        indexOfError : index,
                    });
                    errIndex = index;
                }
            }
            if (errIndex === -1){
                this.setState({
                    color: null,
                    indexOfError : -1,
                });
            }

            this.setState({
                inputValue: inpVal
            });
        }
        this.props.updateTypedWord(inpVal)
    }

    focusTextInput() {
        // Explicitly focus the text input using the raw DOM API
        // Note: we're accessing "current" to get the DOM node
        this.textInput.current.focus();
      }

    componentDidUpdate() {
        if (this.state.lastDisabled !== this.props.disabled){
            this.focusTextInput();
            this.setState({lastDisabled: this.props.disabled,
                            inputValue: '',
                            color: null,})

        }
        
    }


    render() {
        return (
            <div className="input-group mb-3">
                <input type="text" className="form-control" style = {this.state.color} placeholder="Type Here" aria-label="Type Here" aria-describedby="basic-addon2"
                    value={this.state.inputValue} onChange={event => this.updateInputValue(event) } autoFocus disabled={this.props.disabled} ref = {this.textInput}/>
                <div className="input-group-append">
                    {/*<button type="button" className="btn btn-dark" onClick={this.props.handleInput}> {this.props.currentWord}</button>
                    */}
                </div>
            </div>
        );
    }
}