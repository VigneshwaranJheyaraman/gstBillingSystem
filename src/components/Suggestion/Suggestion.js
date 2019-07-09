import React, {Component} from 'react';
class Suggestion extends Component
{
    render()
    {
        return(
                <div onClick={(e) => {this.props.onClick(this.props.value);}} className={this.props.className}>
                    <strong>{this.props.value}</strong>
                </div>
        );
    }
};
export default Suggestion;