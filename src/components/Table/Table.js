import React, {Component} from 'react';
import TableRow from './TableRow';
import TableHeading from './TableHeading';
import TableFooter from './TableFooter';
class Table extends Component
{
    render()
    {
        return <table className={this.props.className}>
            <thead>
                <TableHeading tableHeading={this.props.tableHeading} />
            </thead>
            <tbody>
                <TableRow  tableData={this.props.tableData} objectattributes={this.props.objectattributes}/>
            </tbody>
            <tfoot>
                <TableFooter objectattributes={this.props.objectattributes} finalPrice ={this.props.finalPrice} totalGst={this.props.totalGst} />
            </tfoot>
        </table>
    }
};
export default Table;