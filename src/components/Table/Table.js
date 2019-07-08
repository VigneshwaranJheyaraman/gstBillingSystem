import React, {Component} from 'react';
import TableRow from './TableRow';
import TableHeading from './TableHeading';
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
        </table>
    }
};
export default Table;