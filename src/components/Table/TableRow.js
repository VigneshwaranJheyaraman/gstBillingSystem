import React, {Component} from 'react';
import TableData from './TableData';
class TableRow extends Component
{
    render()
    {
        return this.props.tableData.map((v,i) => {
            return <TableData value={v} objectattributes={this.props.objectattributes} key={i}/>
        });
    }
};
export default TableRow;