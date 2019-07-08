import React, {Component} from 'react';
import Table from './Table/Table';
class UserPurchase extends Component
{
    render()
    {
        return <div className={this.props.responsiveTableClassName} style={{display:this.props.purchaseDisplay}}>
            <Table className={this.props.tableclassName} tableHeading={this.props.tableHeading} tableData = {this.props.tableData} 
            objectattributes={this.props.objectattributes} finalPrice={this.props.finalPrice} totalGst={this.props.totalGst}/>
        </div>
    }
};
export default UserPurchase;