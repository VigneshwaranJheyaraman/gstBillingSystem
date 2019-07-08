import React,{Component} from 'react';
class MenuIcon extends Component
{
    render()
    {
        return <button className={this.props.className} style={this.props.style} onClick={(e) => {
            if(this.props.value === "close")
            {
                this.props.closeWindow(e);
            }
            else if(this.props.value === "max")
            {
                this.props.maximizeWindow(e);
            }
            else if(this.props.value === "min")
            {
                this.props.minimizeWindow(e);
            }
            else
            {
                this.props.reopen(e);
            }
        }} disabled={this.props.disabled}><i className={this.props.iclassName}></i></button>;
    }
}
export default MenuIcon;