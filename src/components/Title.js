import React, {Component} from 'react';
class Title extends Component
{
    render()
    {
        return (
            <p className={this.props.className}><strong>{this.props.title}</strong></p>
        );
    }
}
export default Title;