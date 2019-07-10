import React, {Component} from 'react';
class InputField extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currFoc :0
        };
        this.keyPressEvent = this.keyPressEvent.bind(this);
    }
    keyPressEvent(e)
    {
        if(this.props.autoCorrect)
        {
            let cF;
            if(e.keyCode === 40)
            {
                cF = this.state.currFoc;
                if(cF < this.props.suggestionLength-1)
                {
                    this.setState({currFoc: ++cF}, () => {
                        this.props.onKeyPress(this.state.currFoc, "down", e);
                    });
                }
            }
            else if(e.keyCode === 38)
            {
                cF = this.state.currFoc;
                if(cF > 0)
                {
                    this.setState({currFoc: --cF}, () => {
                        this.props.onKeyPress(this.state.currFoc, "up", e);
                    });
                }
                else if(cF  === 0)
                {
                    this.setState({currFoc: 0}, () => {
                        this.props.onKeyPress(this.state.currFoc, "up", e);
                    });
                }
            }
            else if(e.keyCode === 13)
            {
                e.preventDefault();
                this.props.onKeyPress(this.state.currFoc, "enter", e);
                this.setState({currFoc:0});
            }
        }
        else
        {
            let val = parseInt(e.target.value);
            if(e.keyCode === 40)
            {
                this.props.onKeyPress(val > 0 ? (--val): 0,e);
            }
            else if(e.keyCode === 38)
            {
                this.props.onKeyPress((++val),e);
            }
        }
    }
    render()
    {
        return (
        <input type={this.props.type} onChange={(e) => {
            if(this.props.autoCorrect)
            {
                if(/[a-zA-Z]/.test(e.target.value))
                {
                    this.props.handleAutoCorrect(e.target.value, "text", e);
                }
                else if(/[0-9]+/.test(e.target.value))
                {
                    this.props.handleAutoCorrect(e.target.value, "number", e);
                }
                else if(e.target.value === "")
                {
                    this.props.handleAutoCorrect(e.target.value, "null", e);
                    this.setState({currFoc:0});
                }
            }
            else
            {
                if(/[a-zA-Z0-9]/.test(e.target.value) || e.target.value === "")
                {
                    this.props.onChange(e.target.value, this.props.val, true, e);
                }
                else
                {
                    this.props.onChange(e.target.value, this.props.val, false, e);
                }
            }
        }} placeholder={this.props.placeholder} value={this.props.value} style={{backgroundColor: this.props.color}} onKeyDown={this.keyPressEvent}/>
        );
    }
}
export default InputField;