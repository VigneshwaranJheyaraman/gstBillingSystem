import React, {Component} from 'react';
class Button extends Component
{
    render()
    {
        return(
            <button className={this.props.className} onClick={this.props.onClick}>
                <a href={this.props.href} download={this.props.fileName} target="__blank">
                    <i className={this.props.iconClassName}></i>
                </a>
            </button>
        );
    }
};
export default Button;