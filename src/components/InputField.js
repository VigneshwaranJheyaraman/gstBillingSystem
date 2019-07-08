import React, {Component} from 'react';
class InputField extends Component
{
    render()
    {
        return (
        <input type={this.props.type} onChange={(e) => {
            if(this.props.autoCorrect)
            {
                this.props.handleAutoCorrect(e.target.value, e);
            }
            else
            {
                this.props.onChange(e.target.value, this.props.val, e);
            }
        }} placeholder={this.props.placeholder} value={this.props.value} style={{backgroundColor: this.props.color}}/>
        );
    }
}
export default InputField;