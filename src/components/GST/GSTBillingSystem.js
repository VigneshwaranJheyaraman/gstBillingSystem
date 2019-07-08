import React, {Component} from 'react';
import MenuIcon from '../MenuIcon';
import Title from '../Title';
import GSTBiller from './GSTBiller';
class GSTBillingSystem extends Component
{
    render()
    {
        return(
            <div className="webApp">
                <div className="menuBar">
                    <MenuIcon className="menuIcon" style={{backgroundColor:"#ff2323"}} closeWindow={this.closeWindow} iclassName="fa fa-close" value="close"/>
                    <MenuIcon className="menuIcon" style={{backgroundColor:"#50d616"}} maximizeWindow={this.maximizeWindow} iclassName="fa fa-window-maximize" value="max"/>
                    <MenuIcon className="menuIcon" style={{backgroundColor:"#ffee43"}} maximizeWindow={this.maximizeWindow} iclassName="fa fa-window-minimize" value="min"/>
                    <Title className="titleApp" title="GST Billing System" />
                </div>
                <GSTBiller />
            </div>
        );
    }
}
export default GSTBillingSystem;