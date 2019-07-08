import React, {Component} from 'react';
import MenuIcon from '../MenuIcon';
import Title from '../Title';
import GSTBiller from './GSTBiller';
class GSTBillingSystem extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            appDisplay:"block",
            maxWindow:true
        };
        this.closeWindow = this.closeWindow.bind(this);
        this.reopenWindow = this.reopenWindow.bind(this);
        this.maximizeWindow = this.maximizeWindow.bind(this);
        this.minimizeWindow = this.minimizeWindow.bind(this);
    }
    closeWindow(e)
    {
        this.setState({appDisplay:"none"});
    }
    reopenWindow(e)
    {
        this.setState({appDisplay:"block"});
    }
    maximizeWindow(e)
    {
        this.setState({maxWindow:true});
    }
    minimizeWindow(e)
    {
        this.setState({maxWindow: false});
    }
    render()
    {
        return(
            this.state.appDisplay === "block" ? 
            <div className="webApp">
                <div className="menuBar">
                    <MenuIcon className="menuIcon" style={{backgroundColor:"#ff2323"}} closeWindow={this.closeWindow} iclassName="fa fa-close" value="close" disabled={false}/>
                    <MenuIcon className="menuIcon" style={{backgroundColor:"#50d616"}} maximizeWindow={this.maximizeWindow} iclassName="fa fa-window-maximize" value="max" disabled={this.state.maxWindow}/>
                    <MenuIcon className="menuIcon" style={{backgroundColor:"#ffee43"}} minimizeWindow={this.minimizeWindow} iclassName="fa fa-window-minimize" value="min"disabled={!this.state.maxWindow}/>
                    <Title className="titleApp" title="GST Billing System" />
                </div>
                <GSTBiller maximized={this.state.maxWindow}/>
            </div>
            :
            <MenuIcon className="reopenIcon" style={{backgroundColor:"green"}} iclassName="fa fa-file-code-o" value="reopen" reopen={this.reopenWindow} />
        );
    }
}
export default GSTBillingSystem;