import React, {Component} from 'react';
class TableFooter extends Component
{
    render()
    {
        return (<tr>
            <td><strong>Final Price</strong></td>
            {
                this.props.objectattributes.map((val,i) => {
                    return (i!== 0 && i< this.props.objectattributes.length-2)?<td key={i}>-</td>:null
                })
            }
            <td>{this.props.totalGst}%</td>
            <td>Rs. {this.props.finalPrice.toFixed(2)}</td>
        </tr>);
    }
};
export default TableFooter;