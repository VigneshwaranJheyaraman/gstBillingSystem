import React, {Component} from 'react';
class Button extends Component
{
    render()
    {
        return (
            <button onClick={(e) => {
                if(!this.props.reset)
                {
                    this.props.addToDatabase(e)
                }
                else
                {
                    this.props.resetForm(e)
                }
            }} style={{backgroundColor:this.props.color}}>{this.props.buttonName}</button>
        );
    }
}
export default Button;