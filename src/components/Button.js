import React, {Component} from 'react';
class Button extends Component
{
    render()
    {
        return(
            <button className={this.props.className} onClick={this.props.onClick}>
                <i className={this.props.iconClassName}></i>
            </button>
        );
    }
};
export default Button;